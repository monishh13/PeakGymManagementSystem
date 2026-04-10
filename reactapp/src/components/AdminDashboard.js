// components/AdminDashboard.js - Kinetic Volt Admin Interface

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [systemStats, setSystemStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadAdminData();
    }, []);

    const loadAdminData = async () => {
        try {
            const [usersData, plansData] = await Promise.all([
                api.getUsers().catch(() => []),
                api.getWorkoutPlans().catch(() => [])
            ]);
            // Ensure data arrays exist
            const realUsers = Array.isArray(usersData) ? usersData : usersData?.content || [];
            const realPlans = Array.isArray(plansData) ? plansData : plansData?.content || [];
            
            setUsers(realUsers);
            setWorkoutPlans(realPlans);
            
            const stats = calculateSystemStats(realUsers, realPlans);
            setSystemStats(stats);
        } catch (err) {
            setError(err.message || 'Failed to load admin data');
        } finally {
            setLoading(false);
        }
    };

    const calculateSystemStats = (usersList, plansList) => {
        const clients = usersList.filter(user => user.role === 'CLIENT');
        const trainers = usersList.filter(user => user.role === 'TRAINER');
        const admins = usersList.filter(user => user.role === 'ADMIN');
        return {
            totalUsers: usersList.length,
            totalClients: clients.length,
            totalTrainers: trainers.length,
            totalAdmins: admins.length,
            totalPlans: plansList.length,
            recentUsers: usersList.slice(0, 5),
            recentPlans: plansList.slice(0, 3)
        };
    };

    if (loading) return <p className="text-muted u-center mt-lg">Compiling system overview...</p>;
    if (error) return <div className="badge danger mb-lg">{error}</div>;

    return (
        <div className="admin-dashboard">
            <h2 className="headline mb-lg" style={{ fontSize: '2rem' }}>Admin Control Center</h2>

            {/* Metrics */}
            <div className="metrics-row">
                <div className="metric-card">
                    <span className="metric-value text-primary">{systemStats.totalUsers}</span>
                    <span className="metric-label">Total Users</span>
                </div>
                <div className="metric-card">
                    <span className="metric-value">{systemStats.totalClients}</span>
                    <span className="metric-label">Active Clients</span>
                </div>
                <div className="metric-card">
                    <span className="metric-value">{systemStats.totalTrainers}</span>
                    <span className="metric-label">Trainers</span>
                </div>
                <div className="metric-card">
                    <span className="metric-value">{systemStats.totalPlans}</span>
                    <span className="metric-label">Platform Plans</span>
                </div>
            </div>

            <div className="flex-space mb-md" style={{ marginTop: '3rem' }}>
                <h3 className="title">Recent Access</h3>
                <Link to="/admin/users" className="btn secondary small">Manage All Users</Link>
            </div>

            {/* User Table */}
            <div className="card mb-lg">
                {systemStats.recentUsers?.length > 0 ? (
                    <table className="kv-table">
                        <thead>
                            <tr>
                                <th>Operator</th>
                                <th>Designation</th>
                                <th>Commenced</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {systemStats.recentUsers.map(user => (
                                <tr key={user.userId}>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>{user.username}</div>
                                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>{user.email}</div>
                                    </td>
                                    <td>
                                        <span className={`badge ${user.role === 'ADMIN' ? 'primary' : user.role === 'TRAINER' ? 'neutral' : 'warning'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>{user.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'Active'}</td>
                                    <td>
                                        <Link to={`/users/${user.userId}`} className="btn secondary small">Inspect</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-muted">No user data available.</p>
                )}
            </div>

            {/* Recent Plans Grid */}
            <div className="flex-space mb-md" style={{ marginTop: '3rem' }}>
                <h3 className="title">Program Prototypes</h3>
                <Link to="/workout-plans" className="btn secondary small">System Programs</Link>
            </div>

            <div className="plans-grid">
                {systemStats.recentPlans?.map(plan => (
                    <div key={plan.planId} className="plan-card">
                        <div className="plan-card-body">
                            <div className="badge neutral mb-sm">{plan.difficulty}</div>
                            <h4 className="title" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{plan.title}</h4>
                            <p className="text-muted" style={{ fontSize: '0.875rem' }}>{plan.description}</p>
                            <Link to={`/workout-plans/${plan.planId}`} className="btn secondary small mt-sm" style={{ alignSelf: 'flex-start' }}>Review Params</Link>
                        </div>
                    </div>
                ))}
            </div>
            {(!systemStats.recentPlans || systemStats.recentPlans.length === 0) && (
                <p className="text-muted">No programs initialized.</p>
            )}
        </div>
    );
}

export default AdminDashboard;