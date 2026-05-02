// components/MobileHome.js - Mobile-optimised Layout

import React from 'react';
import { Link } from 'react-router-dom';

function MobileHome() {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--kv-surface-container-lowest)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <div style={{
                width: '100%',
                maxWidth: '440px',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                paddingBottom: '80px',
                position: 'relative',
            }}>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div className="avatar" style={{ width: '40px', height: '40px', fontSize: '1.1rem' }}>P</div>
                        <div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--kv-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Good Morning</div>
                            <div style={{ fontWeight: 600, fontSize: '1rem' }}>Athlete</div>
                        </div>
                    </div>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--kv-surface-container-low)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                        🔔
                    </div>
                </div>

                {/* Body */}
                <div style={{ padding: '0 1.5rem', flex: 1 }}>
                    <h1 style={{ fontFamily: 'var(--kv-font-display)', fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
                        Ready to Train?
                    </h1>

                    {/* Today's Workout Card */}
                    <div style={{
                        background: 'var(--kv-primary-container)',
                        color: 'var(--kv-on-primary-container)',
                        borderRadius: '1.25rem',
                        padding: '1.5rem',
                        marginBottom: '2rem',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        <div style={{ position: 'relative', zIndex: 2 }}>
                            <span className="badge" style={{ background: 'rgba(0,0,0,0.12)', color: 'inherit', marginBottom: '0.75rem', display: 'inline-block', fontSize: '0.65rem' }}>
                                TODAY'S WORKOUT
                            </span>
                            <div style={{ fontFamily: 'var(--kv-font-display)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '0.25rem' }}>
                                Hypertrophy Day A
                            </div>
                            <p style={{ fontSize: '0.875rem', opacity: 0.75, marginBottom: '1.25rem' }}>45 mins • Upper Body Focus</p>
                            <button className="btn" style={{ background: '#111', color: '#fff', width: '100%', fontWeight: 600 }}>
                                Start Session
                            </button>
                        </div>
                        <div style={{ position: 'absolute', right: '-16px', bottom: '-16px', fontSize: '8rem', opacity: 0.08, lineHeight: 1, pointerEvents: 'none' }}>⚡</div>
                    </div>

                    {/* Weekly Progress */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ fontFamily: 'var(--kv-font-display)', fontSize: '1.25rem', fontWeight: 600 }}>Weekly Progress</span>
                        <Link to="/login" style={{ color: 'var(--kv-primary-container)', fontSize: '0.875rem', fontWeight: 500 }}>View All</Link>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {[{ v: '4/5', l: 'Workouts' }, { v: '3.2k', l: 'Vol (kg)' }].map(item => (
                            <div key={item.l} className="card" style={{ padding: '1.25rem' }}>
                                <div style={{ fontFamily: 'var(--kv-font-display)', fontSize: '1.75rem', fontWeight: 700, lineHeight: 1, marginBottom: '0.375rem' }}>{item.v}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--kv-text-muted)' }}>{item.l}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Nav – fixed relative to the inner column */}
                <div style={{
                    position: 'fixed',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    maxWidth: '440px',
                    background: 'var(--kv-surface-container-highest)',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: '0.875rem 0',
                    zIndex: 90,
                }}>
                    {[
                        { icon: '🏠', label: 'Home', to: '/mobile-home', active: true },
                        { icon: '🔍', label: 'Discover', to: '/login' },
                        { icon: '👤', label: 'Profile', to: '/login' },
                    ].map(item => (
                        <Link key={item.label} to={item.to} style={{
                            color: item.active ? 'var(--kv-primary-container)' : 'var(--kv-text-muted)',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem',
                            textDecoration: 'none',
                        }}>
                            <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                            <span style={{ fontSize: '0.65rem', fontWeight: item.active ? 600 : 400 }}>{item.label}</span>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default MobileHome;
