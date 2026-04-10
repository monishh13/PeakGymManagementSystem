// components/LandingPage.js - Kinetic Volt Welcome Page

import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div data-testid="landing-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '4rem 2rem' }}>
            
            <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                <header className="flex-space mb-lg">
                    <div className="brand-logo" style={{ marginBottom: 0 }}>
                        <span className="brand-title">PEAK</span>
                        <span className="brand-subtitle">KINETIC VOLT PRECISION</span>
                    </div>
                    <Link to="/login" className="btn secondary small">Sign In</Link>
                </header>

                <div className="hero-banner" style={{ minHeight: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px' }}>
                        <div className="badge primary mb-sm">SUMMER SERIES</div>
                        <h1 className="display" style={{ fontSize: '5rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
                            UNLEASH THE <br/>
                            <span style={{ color: 'var(--kv-primary)', fontStyle: 'italic' }}>INNER BEAST</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: 'var(--kv-text-muted)', maxWidth: '600px', marginBottom: '2rem', lineHeight: 1.6 }}>
                            Experience our new 8-week periodization program designed for maximum hypertrophy and explosive power. Developed by Olympic level coaches.
                        </p>
                        
                        <div className="flex-gap">
                            <Link to="/login" className="btn" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>Explore Platform <span style={{ marginLeft: '0.5rem' }}>→</span></Link>
                            <Link to="/mobile-home" className="btn secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>Preview Mobile</Link>
                        </div>
                    </div>
                </div>

                <div className="metrics-row mt-lg">
                    <div className="metric-card" style={{ background: 'transparent', border: 'none', padding: '1rem 0' }}>
                        <span className="metric-value text-primary">Personalized</span>
                        <span className="metric-label" style={{ fontSize: '1rem' }}>Workout Plans</span>
                    </div>
                    <div className="metric-card" style={{ background: 'transparent', border: 'none', padding: '1rem 0' }}>
                        <span className="metric-value text-primary">Real-time</span>
                        <span className="metric-label" style={{ fontSize: '1rem' }}>Progress Tracking</span>
                    </div>
                    <div className="metric-card" style={{ background: 'transparent', border: 'none', padding: '1rem 0' }}>
                        <span className="metric-value text-primary">Precision</span>
                        <span className="metric-label" style={{ fontSize: '1rem' }}>Data Analytics</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default LandingPage;