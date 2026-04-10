// components/MobileHome.js - Mobile Layout 

import React from 'react';
import { Link } from 'react-router-dom';

function MobileHome() {
    return (
        <div style={{ maxWidth: '480px', margin: '0 auto', background: 'var(--kv-surface-container-lowest)', minHeight: '100vh', paddingBottom: '80px', paddingTop: '1rem', position: 'relative' }}>
            
            <div className="flex-space" style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div className="avatar" style={{ width: '40px', height: '40px' }}>P</div>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--kv-text-muted)', textTransform: 'uppercase' }}>Good Morning</div>
                        <div style={{ fontWeight: 600 }}>Athlete</div>
                    </div>
                </div>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--kv-surface-container-low)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span role="img" aria-label="bell">🔔</span>
                </div>
            </div>

            <div style={{ padding: '0 1.5rem' }}>
                <h1 className="display" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Ready to Train?</h1>
                
                <div className="card floating mb-lg" style={{ background: 'var(--kv-primary-container)', color: 'var(--kv-on-primary-container)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <div className="badge" style={{ background: 'rgba(0,0,0,0.1)', color: 'inherit', marginBottom: '0.5rem' }}>TODAY'S WORKOUT</div>
                        <h2 className="headline" style={{ color: 'inherit' }}>Hypertrophy Day A</h2>
                        <p style={{ opacity: 0.8, marginBottom: '1.5rem' }}>45 mins • Upper Body Focus</p>
                        <button className="btn" style={{ background: '#111', color: '#fff', width: '100%' }}>Start Session</button>
                    </div>
                    {/* Decorative element */}
                    <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', fontSize: '10rem', opacity: 0.1, lineHeight: 1 }}>⚡</div>
                </div>

                <div className="flex-space mb-md">
                    <h3 className="title">Weekly Progress</h3>
                    <Link to="/login" className="text-primary" style={{ fontSize: '0.875rem' }}>View All</Link>
                </div>

                <div className="metrics-row mb-md">
                    <div className="metric-card" style={{ padding: '1rem', minWidth: '100px' }}>
                        <span className="metric-value" style={{ fontSize: '1.5rem' }}>4/5</span>
                        <span className="metric-label" style={{ fontSize: '0.75rem' }}>Workouts</span>
                    </div>
                    <div className="metric-card" style={{ padding: '1rem', minWidth: '100px' }}>
                        <span className="metric-value" style={{ fontSize: '1.5rem' }}>3.2k</span>
                        <span className="metric-label" style={{ fontSize: '0.75rem' }}>Vol (kg)</span>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Nav */}
            <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', maxWidth: '480px', left: '50%', transform: 'translateX(-50%)', background: 'var(--kv-surface-container-high)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-around', padding: '1rem' }}>
                <div style={{ color: 'var(--kv-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                    <span role="img" aria-label="home" style={{ fontSize: '1.25rem' }}>🏠</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>Home</span>
                </div>
                <Link to="/login" style={{ color: 'var(--kv-text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                    <span role="img" aria-label="search" style={{ fontSize: '1.25rem' }}>🔍</span>
                    <span style={{ fontSize: '0.65rem' }}>Discover</span>
                </Link>
                <Link to="/login" style={{ color: 'var(--kv-text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                    <span role="img" aria-label="profile" style={{ fontSize: '1.25rem' }}>👤</span>
                    <span style={{ fontSize: '0.65rem' }}>Profile</span>
                </Link>
            </div>
        </div>
    );
}

export default MobileHome;
