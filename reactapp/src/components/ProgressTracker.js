// components/ProgressTracker.js - Advanced Progress Tracker

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../utils/api';

function ProgressTracker() {
    const { userId } = useParams();
    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    
    // Form state
    const [logData, setLogData] = useState({
        date: new Date().toISOString().split('T')[0],
        completionPercentage: 100,
        notes: '',
        totalWeight: 0,
        userId: userId
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setIsOwner(localStorage.getItem('userId') === userId);
        loadProgress();
    }, [userId]);

    const loadProgress = async () => {
        try {
            setLoading(true);
            const data = await api.getUserProgress(userId);
            setProgress(data || []);
        } catch (err) {
            setError(err.message || 'Failed to establish telemetry');
        } finally {
            setLoading(false);
        }
    };

    const handleProgressLog = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            await api.logProgress({
                ...logData,
                completionPercentage: Number(logData.completionPercentage),
                totalWeight: Number(logData.totalWeight)
            });
            await loadProgress();
            // Reset form
            setLogData({
                ...logData,
                completionPercentage: 100,
                notes: '',
                totalWeight: 0
            });
        } catch (err) {
            setError(err.message || 'Telemetry validation failed');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <p className="text-muted u-center mt-lg">Synchronizing telemetry...</p>;

    const totalWeight = progress.reduce((sum, p) => sum + (p.totalWeight || 0), 0);
    const avgComplete = progress.length > 0 ? Math.round(progress.reduce((sum, p) => sum + p.completionPercentage, 0) / progress.length) : 0;

    return (
        <div data-testid="progress-container">
            <div className="flex-space mb-md">
                <h2 className="headline" style={{ fontSize: '2rem' }}>Performance Telemetry</h2>
                {!isOwner && <Link to={`/users/${userId}`} className="btn secondary small">Return to Dossier</Link>}
            </div>

            {error && <div className="badge danger mb-lg">{error}</div>}

            {/* Metrics */}
            <div className="metrics-row">
                <div className="metric-card" style={{ background: 'var(--kv-surface-container-highest)' }}>
                    <span className="metric-value text-primary">{progress.length}</span>
                    <span className="metric-label">Logged Sequences</span>
                </div>
                <div className="metric-card" style={{ background: 'var(--kv-surface-container-highest)' }}>
                    <span className="metric-value">{avgComplete}%</span>
                    <span className="metric-label">Mean Output Ratio</span>
                    
                    {/* Visual Progress Bar Component */}
                    <div className="progress-track mt-sm" style={{ height: '4px' }}>
                        <div className="progress-fill" style={{ width: `${avgComplete}%` }}></div>
                    </div>
                </div>
                <div className="metric-card" style={{ background: 'var(--kv-surface-container-highest)' }}>
                    <span className="metric-value">{totalWeight}<span style={{ fontSize: '1rem', color: 'var(--kv-text-muted)' }}>kg</span></span>
                    <span className="metric-label">Cumulative Volume</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem', alignItems: 'flex-start' }}>
                
                {/* Form Input */}
                {isOwner && (
                    <div className="card">
                        <h3 className="title mb-md">Input Terminal</h3>
                        <form onSubmit={handleProgressLog}>
                            <div className="form-field">
                                <label>Date of Execution</label>
                                <input type="date" className="input" value={logData.date} onChange={e => setLogData({...logData, date: e.target.value})} required />
                            </div>
                            <div className="form-field">
                                <label>Output Ratio (%)</label>
                                <input type="number" className="input" min="0" max="100" value={logData.completionPercentage} onChange={e => setLogData({...logData, completionPercentage: e.target.value})} required />
                            </div>
                            <div className="form-field">
                                <label>Volume Metric (kg)</label>
                                <input type="number" className="input" min="0" value={logData.totalWeight} onChange={e => setLogData({...logData, totalWeight: e.target.value})} required />
                            </div>
                            <div className="form-field">
                                <label>Operational Notes</label>
                                <textarea className="input" rows="3" value={logData.notes} onChange={e => setLogData({...logData, notes: e.target.value})} style={{ resize: 'vertical' }}></textarea>
                            </div>
                            <button type="submit" className="btn" style={{ width: '100%' }} disabled={submitting}>
                                {submitting ? 'Transmitting...' : 'Upload Parameters'}
                            </button>
                        </form>
                    </div>
                )}

                {/* History */}
                <div className="card sticky-panel" style={{ height: '100%' }}>
                    <h3 className="title mb-md">Telemetry Log</h3>
                    {progress.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {progress.sort((a,b) => new Date(b.date) - new Date(a.date)).map(p => (
                                <div key={p.progressId} style={{ background: 'var(--kv-surface-container-highest)', padding: '1rem', borderRadius: '0.75rem', position: 'relative', overflow: 'hidden' }}>
                                    {/* Left accent strip mapping output ratio */}
                                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: p.completionPercentage >= 100 ? 'var(--kv-primary)' : 'var(--kv-secondary)' }} />
                                    
                                    <div className="flex-space mb-xs">
                                        <div style={{ fontWeight: 600, fontSize: '1.125rem' }}>
                                            {new Date(p.date).toLocaleDateString()}
                                        </div>
                                        <div className="badge neutral">{p.completionPercentage}% Output</div>
                                    </div>
                                    {p.totalWeight > 0 && (
                                        <div style={{ fontSize: '0.875rem', color: 'var(--kv-text-primary)' }}>Volume: {p.totalWeight}kg</div>
                                    )}
                                    {p.notes && (
                                        <p className="text-muted mt-sm mb-xs" style={{ fontSize: '0.875rem', fontStyle: 'italic' }}>"{p.notes}"</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted">Awaiting initial telemetry sequence.</p>
                    )}
                </div>

            </div>
        </div>
    );
}

export default ProgressTracker;