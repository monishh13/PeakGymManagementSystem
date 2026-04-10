// components/UserDetail.js - User Detail Profile

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../utils/api';

function UserDetail() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState(null);

    const currentUserRole = localStorage.getItem('userRole');

    useEffect(() => {
        loadUserDetails();
    }, [userId]);

    const loadUserDetails = async () => {
        try {
            setLoading(true);
            const [userData, progressData] = await Promise.all([
                api.getUser(userId),
                api.getUserProgress(userId).catch(() => [])
            ]);
            setUser(userData);
            setEditForm(userData);
            setProgress(progressData || []);
        } catch (err) {
            setError(err.message || 'Failed to retrieve operator record');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            await api.updateUser(userId, editForm);
            setUser(editForm);
            setIsEditing(false);
        } catch (err) {
            setError(err.message || 'Update failed');
        }
    };

    if (loading) return <p className="text-muted u-center mt-lg">Decrypting operator file...</p>;
    if (error) return <div className="badge danger mb-lg">{error}</div>;
    if (!user) return <div className="badge warning mb-lg">Record Not Found</div>;

    const completedWorkouts = Array.isArray(progress) ? progress.length : 0;

    return (
        <div data-testid="user-detail-container">
            <div className="flex-space mb-md">
                <button className="btn secondary small" onClick={() => navigate('/users')}>← Enlisted Directory</button>
                {currentUserRole === 'ADMIN' && (
                    <button className="btn small" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? 'Cancel Edit' : 'Modify Record'}
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="card mb-lg">
                    <h3 className="title mb-md">Update Operator Data</h3>
                    <form onSubmit={handleUpdateUser}>
                        <div className="form-field">
                            <label>Alias (Username)</label>
                            <input className="input" type="text" value={editForm.username} onChange={e => setEditForm({...editForm, username: e.target.value})} required />
                        </div>
                        <div className="form-field">
                            <label>Channel (Email)</label>
                            <input className="input" type="email" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} required />
                        </div>
                        <div className="form-field">
                            <label>Designation (Role)</label>
                            <select className="select" value={editForm.role} onChange={e => setEditForm({...editForm, role: e.target.value})}>
                                <option value="CLIENT">Client</option>
                                <option value="TRAINER">Trainer</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                        <button type="submit" className="btn">Save Configuration</button>
                    </form>
                </div>
            ) : (
                <div className="card mb-lg" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--kv-surface-container-high)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 600, color: 'var(--kv-primary)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        {user.username ? user.username.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div>
                        <div className={`badge ${user.role === 'ADMIN' ? 'primary' : user.role === 'TRAINER' ? 'neutral' : 'warning'} mb-xs`}>
                            {user.role} 
                        </div>
                        <h1 className="display" style={{ fontSize: '3rem', marginBottom: '0.25rem' }}>{user.username}</h1>
                        <p className="text-muted" style={{ fontSize: '1.125rem' }}>{user.email}</p>
                    </div>
                </div>
            )}

            {user.role === 'CLIENT' && (
                <div>
                    <h3 className="title mb-sm border-bottom pb-xs">Protocol Metrics</h3>
                    <div className="metrics-row mb-md">
                        <div className="metric-card">
                            <span className="metric-value">{completedWorkouts}</span>
                            <span className="metric-label">Completed Sessions</span>
                        </div>
                        <div className="metric-card">
                            <span className="metric-value text-primary">Active</span>
                            <span className="metric-label">System Status</span>
                        </div>
                        <div className="metric-card" style={{ background: 'var(--kv-surface-container-high)' }}>
                            <span className="metric-value" style={{ color: 'var(--kv-secondary)' }}>Log</span>
                            <span className="metric-label">Access Telemetry →</span>
                            <Link to={`/progress/${userId}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserDetail;