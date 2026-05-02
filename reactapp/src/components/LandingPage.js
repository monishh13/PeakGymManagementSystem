// components/LandingPage.js - Kinetic Volt Welcome Page

import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div
            data-testid="landing-container"
            style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--kv-surface)' }}
        >
            <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '3rem 2.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                
                {/* Nav */}
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                    <div>
                        <div style={{ fontFamily: 'var(--kv-font-display)', fontSize: '1.5rem', fontStyle: 'italic', fontWeight: 700, letterSpacing: '-0.05em', color: 'var(--kv-text)', lineHeight: 1 }}>PEAK</div>
                        <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--kv-text-muted)', marginTop: '0.2rem', textTransform: 'uppercase' }}>KINETIC VOLT PRECISION</div>
                    </div>
                    <Link to="/login" className="btn secondary small">Sign In</Link>
                </header>

                {/* Hero Banner */}
                <div
                    className="hero-banner"
                    style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 3rem', marginBottom: '2rem' }}
                >
                    <div>
                        <span className="badge primary" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>SUMMER SERIES</span>
                        <h1
                            style={{
                                fontFamily: 'var(--kv-font-display)',
                                fontSize: 'clamp(3rem, 7vw, 6rem)',
                                fontWeight: 700,
                                lineHeight: 1.05,
                                letterSpacing: '-0.04em',
                                textTransform: 'uppercase',
                                marginBottom: '1.5rem',
                                color: 'var(--kv-text)',
                            }}
                        >
                            UNLEASH THE
                            <br />
                            <span style={{ color: 'var(--kv-primary-container)', fontStyle: 'italic' }}>INNER BEAST</span>
                        </h1>
                        <p style={{ fontSize: '1.125rem', color: 'var(--kv-text-muted)', maxWidth: '560px', marginBottom: '2.5rem', lineHeight: 1.65 }}>
                            Experience our new 8-week periodization program designed for maximum hypertrophy and explosive power. Developed by Olympic level coaches.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link to="/login" className="btn" style={{ padding: '1rem 2rem', fontSize: '1.0625rem' }}>
                                Explore Platform <span style={{ marginLeft: '0.5rem' }}>→</span>
                            </Link>
                            <Link to="/mobile-home" className="btn secondary" style={{ padding: '1rem 2rem', fontSize: '1.0625rem' }}>
                                Preview Mobile
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Feature Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                    {[
                        { stat: 'Personalized', label: 'Workout Plans' },
                        { stat: 'Real-time', label: 'Progress Tracking' },
                        { stat: 'Precision', label: 'Data Analytics' },
                    ].map((item) => (
                        <div key={item.label} className="card" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                            <div style={{ fontFamily: 'var(--kv-font-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--kv-primary-container)', marginBottom: '0.5rem' }}>{item.stat}</div>
                            <div style={{ color: 'var(--kv-text-muted)', fontSize: '0.9375rem' }}>{item.label}</div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default LandingPage;