// components/AthleteProfile.js - Athlete Profile Details

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../utils/api';

function AthleteProfile() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAthleteData = async () => {
            try {
                const [userData, progressData] = await Promise.all([
                    api.getUser(userId).catch(() => null),
                    api.getUserProgress(userId).catch(() => [])
                ]);
                setUser(userData);
                setProgress(progressData || []);
            } catch (err) {
                console.error('Failed to load athlete profile', err);
            } finally {
                setLoading(false);
            }
        };
        loadAthleteData();
    }, [userId]);

    if (loading) {
        return <div className="card u-center"><p className="text-muted">Loading athlete profile...</p></div>;
    }

    if (!user) {
        return (
            <div className="card u-center">
                <h3 className="h2 text-danger">Athlete Not Found</h3>
                <Link to="/users" className="btn secondary mt-sm">Back to Directory</Link>
            </div>
        );
    }

    return (
        <div data-testid="athlete-profile-container">
            <div className="flex-space mb-md">
                <h2 className="headline">Athlete Profile</h2>
                <Link to="/users" className="btn secondary small">Back</Link>
            </div>

            {/* Profile Hero */}
            <div className="card mb-lg" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--kv-primary-container)', color: 'var(--kv-on-primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: '700' }}>
                    {user.username ? user.username.charAt(0).toUpperCase() : 'A'}
                </div>
                <div>
                    <h1 className="display" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{user.username}</h1>
                    <div className="flex-gap">
                        <span className="badge neutral">{user.email}</span>
                        <span className="badge primary">ELITE TIER</span>
                    </div>
                </div>
            </div>

            <div className="metrics-row">
                <div className="metric-card">
                    <span className="metric-value">{progress.length}</span>
                    <span className="metric-label">Completed Sessions</span>
                </div>
                <div className="metric-card">
                    <span className="metric-value text-primary">12</span>
                    <span className="metric-label">Week Streak</span>
                </div>
                <div className="metric-card">
                    <span className="metric-value">340<span style={{ fontSize: '1rem', color: 'var(--kv-text-muted)' }}>kg</span></span>
                    <span className="metric-label">Max Deadlift</span>
                </div>
            </div>

            {/* History Section */}
            <div className="card">
                <h3 className="title mb-sm">Recent Activity</h3>
                {progress.length > 0 ? (
                    <table className="kv-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Log Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {progress.slice(0, 5).map((p, i) => (
                                <tr key={p.progressId || i}>
                                    <td>{p.date ? new Date(p.date).toLocaleDateString() : 'N/A'}</td>
                                    <td>{p.notes || `Completion: ${p.completionPercentage}%`}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-muted">No recent activity logged by this athlete.</p>
                )}
            </div>
        </div>
    );
}

export default AthleteProfile;
