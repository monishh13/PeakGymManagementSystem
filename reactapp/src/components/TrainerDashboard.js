// components/TrainerDashboard.js - Kinetic Volt Trainer Interface

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';

function TrainerDashboard() {
    const [clients, setClients] = useState([]);
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadTrainerData();
    }, []);

    const loadTrainerData = async () => {
        try {
            const [clientsData, plansData] = await Promise.all([
                api.getMyClients().catch(() => []),
                api.getWorkoutPlans().catch(() => [])
            ]);
            
            setClients(Array.isArray(clientsData) ? clientsData : []);
            const realPlans = Array.isArray(plansData) ? plansData : plansData?.content || [];
            setWorkoutPlans(realPlans);
        } catch (err) {
            setError(err.message || 'Failed to load trainer data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="text-muted u-center mt-lg">Loading roster parameters...</p>;
    if (error) return <div className="badge danger mb-lg">{error}</div>;

    const activeClients = clients.filter(c => c.status === 'ACTIVE').length;
    const recentClients = clients.slice(0, 4);

    return (
        <div>
            <div className="flex-space mb-lg">
                <h2 className="headline" style={{ fontSize: '2rem' }}>Command Console</h2>
                <Link to="/workout-plans/create" className="btn small">Mint Program</Link>
            </div>

            <div className="metrics-row">
                <div className="metric-card">
                    <span className="metric-value text-primary">{clients.length}</span>
                    <span className="metric-label">Assigned Athletes</span>
                </div>
                <div className="metric-card">
                    <span className="metric-value">{activeClients}</span>
                    <span className="metric-label">Operative Status</span>
                </div>
                <div className="metric-card">
                    <span className="metric-value">{workoutPlans.length}</span>
                    <span className="metric-label">Deployed Plans</span>
                </div>
            </div>

            {/* Clients Roster */}
            <div className="flex-space mb-md" style={{ marginTop: '2rem' }}>
                <h3 className="title">Active Roster</h3>
                <Link to="/users" className="text-primary" style={{ fontSize: '0.875rem' }}>View All →</Link>
            </div>

            <div className="clients-grid mb-lg">
                {recentClients.map(client => (
                    <div key={client.userId} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
                        <div className="avatar" style={{ width: '48px', height: '48px' }}>
                            {client.username ? client.username.charAt(0).toUpperCase() : '?'}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600 }}>{client.username}</div>
                            <div className="text-muted" style={{ fontSize: '0.75rem' }}>{client.email}</div>
                        </div>
                        <Link to={`/athletes/${client.userId}`} className="btn secondary small">Inspect</Link>
                    </div>
                ))}
                {clients.length === 0 && (
                    <p className="text-muted">No athletes assigned to your sector.</p>
                )}
            </div>

            {/* Workout Plans */}
            <div className="flex-space mb-md" style={{ marginTop: '2rem' }}>
                <h3 className="title">Authoritative Plans</h3>
                <Link to="/workout-plans" className="text-primary" style={{ fontSize: '0.875rem' }}>Library →</Link>
            </div>

            <div className="plans-grid">
                {workoutPlans.slice(0, 4).map(plan => (
                    <div key={plan.planId} className="plan-card">
                        <div className="plan-placeholder-img">
                            <span className="badge primary" style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>{plan.difficulty}</span>
                        </div>
                        <div className="plan-card-body">
                            <h4 className="title mb-xs">{plan.title}</h4>
                            <p className="text-muted mb-md" style={{ fontSize: '0.875rem', flex: 1 }}>{plan.description}</p>
                            <Link to={`/workout-plans/${plan.planId}`} className="btn secondary" style={{ width: '100%' }}>View Syllabus</Link>
                        </div>
                    </div>
                ))}
                {workoutPlans.length === 0 && (
                    <p className="text-muted">Library empty. Initiate program creation.</p>
                )}
            </div>
        </div>
    );
}

export default TrainerDashboard;