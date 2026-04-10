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
        <div data-testid="login-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backgroundImage: 'radial-gradient(circle at center, var(--kv-surface-container-high) 0%, var(--kv-surface-container-lowest) 100%)' }}>
            <div className="card kv-glass" style={{ width: '100%', maxWidth: '400px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 24px 48px rgba(0,0,0,0.8)' }}>
                <div className="u-center mb-md">
                    <div className="brand-logo" style={{ alignItems: 'center', marginBottom: '1.5rem' }}>
                        <span className="brand-title">PEAK</span>
                        <span className="brand-subtitle">KINETIC VOLT PRECISION</span>
                    </div>
                    <h1 className="h2 headline">Transmission Access</h1>
                    <p className="small text-muted">Authenticate to enter the performance system.</p>
                </div>

                {error && (
                    <div className="badge danger mb-sm" style={{ width: '100%', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="form-field">
                        <label htmlFor="email">Operator ID (Email)</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="input"
                            value={credentials.email}
                            onChange={handleInputChange}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="password">Access Code (Password)</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="input"
                            value={credentials.password}
                            onChange={handleInputChange}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn"
                        style={{ width: '100%', marginTop: '1rem' }}
                        disabled={loading}
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                    
                    <button type="button" className="btn secondary" style={{ width: '100%', marginTop: '0.5rem', border: 'none' }} onClick={() => navigate('/landing')}>
                        Return to Hub
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;