// components/LoginPage.js - Kinetic Volt Authentication

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

function LoginPage() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await api.login(credentials);
            localStorage.setItem('token', response.token);
            localStorage.setItem('userRole', response.role);
            localStorage.setItem('userId', response.userId);
            localStorage.setItem('username', response.username);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div
            data-testid="login-container"
            style={{
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'radial-gradient(ellipse at 50% 40%, var(--kv-surface-container-high) 0%, var(--kv-surface-container-lowest) 70%)',
            }}
        >
            <div
                className="card kv-glass"
                style={{
                    width: '100%',
                    maxWidth: '440px',
                    margin: '0 auto',
                    border: '1px solid rgba(255,255,255,0.06)',
                    boxShadow: '0 32px 64px rgba(0,0,0,0.6)',
                    padding: '2.5rem',
                }}
            >
                {/* Branding */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ fontFamily: 'var(--kv-font-display)', fontSize: '2rem', fontStyle: 'italic', fontWeight: 700, letterSpacing: '-0.05em', color: 'var(--kv-text)', lineHeight: 1 }}>PEAK</div>
                    <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--kv-text-muted)', marginTop: '0.25rem', textTransform: 'uppercase' }}>KINETIC VOLT PRECISION</div>
                    <h1 style={{ fontFamily: 'var(--kv-font-display)', fontSize: '1.5rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.25rem', color: 'var(--kv-text)' }}>Transmission Access</h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--kv-text-muted)', margin: 0 }}>Authenticate to enter the performance system.</p>
                </div>

                {error && (
                    <div style={{ background: 'rgba(255, 115, 81, 0.1)', border: '1px solid rgba(255, 115, 81, 0.3)', color: 'var(--kv-error)', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="form-field">
                        <label htmlFor="email">Operator ID (Email)</label>
                        <input id="email" name="email" type="email" className="input" value={credentials.email} onChange={handleInputChange} required autoComplete="email" />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Access Code (Password)</label>
                        <input id="password" name="password" type="password" className="input" value={credentials.password} onChange={handleInputChange} required autoComplete="current-password" />
                    </div>
                    <button type="submit" className="btn" style={{ width: '100%', marginTop: '0.5rem', padding: '0.875rem' }} disabled={loading}>
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                    <button type="button" className="btn secondary" style={{ width: '100%', marginTop: '0.75rem', border: 'none', color: 'var(--kv-text-muted)' }} onClick={() => navigate('/landing')}>
                        Return to Hub
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;