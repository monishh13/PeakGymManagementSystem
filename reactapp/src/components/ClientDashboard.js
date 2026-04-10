// components/ClientDashboard.js - Kinetic Volt Client Interface

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';

function ClientDashboard() {
    const [workoutPlan, setWorkoutPlan] = useState(null);
    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadClientData();
    }, []);

    const loadClientData = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const [planData, progressData] = await Promise.all([
                api.getMyWorkoutPlan().catch(() => null),
                api.getUserProgress(userId).catch(() => [])
            ]);
            
            setWorkoutPlan(planData);
            setProgress(progressData || []);
        } catch (err) {
            setError(err.message || 'Failed to sync temporal data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="text-muted u-center mt-lg">Syncing biomechanics profile...</p>;
    if (error) return <div className="badge danger mb-lg">{error}</div>;

    const completed = Array.isArray(progress) ? progress.length : 0;

    return (
        <div>
            {/* Today's Workout Hero */}
            {workoutPlan ? (
                <div className="hero-banner" style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div className="badge primary mb-sm" style={{ alignSelf: 'flex-start' }}>ACTIVE PROTOCOL</div>
                    <h1 className="display" style={{ fontSize: '3.5rem', marginBottom: '0.5rem', maxWidth: '800px' }}>
                        {workoutPlan.title}
                    </h1>
                    <p className="text-muted mb-md" style={{ maxWidth: '600px', fontSize: '1.125rem' }}>
                        {workoutPlan.description}
                    </p>
                    <div className="flex-gap mt-sm">
                        <Link to={`/workout-plans/${workoutPlan.planId}`} className="btn">Initiate Sequence</Link>
                        <Link to={`/progress/${localStorage.getItem('userId')}`} className="btn secondary">Log Output</Link>
                    </div>
                </div>
            ) : (
                <div className="card u-center mb-lg" style={{ padding: '4rem 2rem' }}>
                    <h2 className="headline text-muted mb-sm">No Active Protocol</h2>
                    <p className="text-muted mb-md">Awaiting assignment from your commanding trainer.</p>
                    <Link to="/workout-plans" className="btn secondary">Browse Library</Link>
                </div>
            )}

            {/* Progress Metrics */}
            <h3 className="title mb-md" style={{ marginTop: '2rem' }}>Metabolic Output</h3>
            <div className="metrics-row">
                <div className="metric-card">
                    <span className="metric-value text-primary">{completed}</span>
                    <span className="metric-label">Completed Sessions</span>
                </div>
                <div className="metric-card">
                    <span className="metric-value">0<span style={{ fontSize: '1rem', color: 'var(--kv-text-muted)' }}>kg</span></span>
                    <span className="metric-label">Volume Metric</span>
                </div>
                <div className="metric-card" style={{ background: 'var(--kv-surface-container-high)' }}>
                    <span className="metric-value" style={{ color: 'var(--kv-secondary)' }}>Log</span>
                    <span className="metric-label">Submit Data →</span>
                    <Link to={`/progress/${localStorage.getItem('userId')}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></Link>
                </div>
            </div>

            {/* Preview Next Exercises */}
            {workoutPlan?.exercises?.length > 0 && (
                <div className="mt-lg">
                    <h3 className="title mb-md">Syllabus Cache</h3>
                    <div className="plans-grid">
                        {workoutPlan.exercises.slice(0, 3).map((ex, i) => (
                            <div key={ex.id || i} className="card" style={{ padding: '1.25rem' }}>
                                <div className="badge neutral mb-sm">Move {i + 1}</div>
                                <h4 style={{ fontWeight: 600, fontSize: '1.25rem', marginBottom: '0.5rem' }}>{ex.name}</h4>
                                <div className="flex-space" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                                    <span className="text-muted" style={{ fontSize: '0.875rem' }}>{ex.sets} Sets × {ex.reps} Reps</span>
                                    {ex.restTimeSeconds && <span className="text-primary" style={{ fontSize: '0.875rem' }}>{ex.restTimeSeconds}s Rest</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ClientDashboard;