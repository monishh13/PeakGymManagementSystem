// App.js - Main Application Router

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import WorkoutPlanList from './components/WorkoutPlanList';
import WorkoutPlanDetail from './components/WorkoutPlanDetail';
import ProgressTracker from './components/ProgressTracker';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';
import PrivateRoute from './components/PrivateRoute';
import AthleteProfile from './components/AthleteProfile';
import UserManagement from './components/UserManagement';
import MobileHome from './components/MobileHome';

import './components/theme.css';

/* ─── Sidebar nav item icons (text-based) ─── */
const NAV_ITEMS = [
    { icon: '⊞', label: 'Dashboard', path: '/', exact: true, roles: null },
    { icon: '◎', label: 'Members',   path: '/users',         exact: false, roles: ['ADMIN','TRAINER'] },
    { icon: '⚡', label: 'Workouts',  path: '/workout-plans', exact: false, roles: null },
    { icon: '↗', label: 'Analytics', path: '/progress',      exact: false, roles: null },
    { icon: '⚙', label: 'Settings',  path: '/admin/users',   exact: false, roles: ['ADMIN'] },
];

const AppLayout = ({ children }) => {
    const location  = useLocation();
    const navigate  = useNavigate();
    const userRole  = localStorage.getItem('userRole');
    const username  = localStorage.getItem('username') || 'User';
    const userId    = localStorage.getItem('userId');

    const isPublicRoute =
        location.pathname === '/login' ||
        location.pathname === '/landing' ||
        location.pathname === '/mobile-home';

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    if (isPublicRoute) {
        return <>{children}</>;
    }

    const isActive = (item) => {
        if (item.exact) return location.pathname === item.path;
        if (item.path === '/progress') return location.pathname.startsWith('/progress');
        return location.pathname.startsWith(item.path);
    };

    const visibleItems = NAV_ITEMS.filter(item =>
        !item.roles || (userRole && item.roles.includes(userRole))
    );

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--kv-surface)' }}>

            {/* ── Fixed Sidebar ── */}
            <aside className="kv-sidebar">

                {/* Brand */}
                <div style={{ padding: '0 0.5rem', marginBottom: '2.5rem' }}>
                    <div style={{ fontFamily: 'var(--kv-font-display)', fontSize: '1.5rem', fontStyle: 'italic', fontWeight: 700, letterSpacing: '-0.05em', color: 'var(--kv-text)', lineHeight: 1 }}>PEAK</div>
                    <div style={{ fontSize: '0.6rem', letterSpacing: '0.14em', color: 'var(--kv-text-muted)', marginTop: '0.2rem', textTransform: 'uppercase' }}>KINETIC VOLT PRECISION</div>
                </div>

                {/* Nav Links */}
                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', overflowY: 'auto' }}>
                    {visibleItems.map(item => {
                        const active = isActive(item);
                        const href = item.path === '/progress' ? `/progress/${userId}` : item.path;
                        return (
                            <Link key={item.path} to={href}
                                className={`nav-item${active ? ' active' : ''}`}
                                style={{ textDecoration: 'none', gap: '0.75rem' }}
                            >
                                <span style={{ fontSize: '1rem', width: '20px', textAlign: 'center' }}>{item.icon}</span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {userRole === 'TRAINER' && (
                        <Link to="/workout-plans/create" className="btn" style={{ width: '100%', fontSize: '0.875rem', padding: '0.625rem 1rem' }}>
                            + New Workout
                        </Link>
                    )}
                    <div className="user-profile-badge">
                        <div className="avatar">{username.charAt(0).toUpperCase()}</div>
                        <div className="user-details">
                            <span className="user-name">{username}</span>
                            <span className="user-tier">{userRole}</span>
                        </div>
                    </div>
                    <button className="btn secondary small" onClick={handleLogout} style={{ width: '100%' }}>
                        Logout
                    </button>
                </div>

            </aside>

            {/* ── Main Content ── */}
            <div style={{ marginLeft: '240px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

                {/* Topbar */}
                <div style={{
                    position: 'sticky', top: 0, zIndex: 50,
                    background: 'var(--kv-surface)', borderBottom: '1px solid rgba(255,255,255,0.04)',
                    padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem'
                }}>
                    <input
                        type="text"
                        className="input"
                        placeholder="Search…"
                        style={{ maxWidth: '320px', width: '100%', padding: '0.625rem 1rem', fontSize: '0.875rem' }}
                    />
                    <div className="user-profile-badge" style={{ background: 'transparent', padding: '0', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.875rem', color: 'var(--kv-text-muted)' }}>{username}</span>
                        <div className="avatar" style={{ width: '28px', height: '28px', fontSize: '0.75rem' }}>{username.charAt(0).toUpperCase()}</div>
                    </div>
                </div>

                {/* Page Content */}
                <div style={{ flex: 1, padding: '2rem' }}>
                    {children}
                </div>
            </div>

        </div>
    );
};

function App() {
    return (
        <Router>
            <AppLayout>
                <Routes>
                    <Route path="/landing"     element={<LandingPage />} />
                    <Route path="/login"       element={<LoginPage />} />
                    <Route path="/mobile-home" element={<MobileHome />} />

                    <Route element={<PrivateRoute />}>
                        <Route path="/"                          element={<Dashboard />} />
                        <Route path="/workout-plans"             element={<WorkoutPlanList />} />
                        <Route path="/workout-plans/:planId"     element={<WorkoutPlanDetail />} />
                        <Route path="/progress/:userId"          element={<ProgressTracker />} />
                        <Route path="/athletes/:userId"          element={<AthleteProfile />} />
                    </Route>

                    <Route element={<PrivateRoute allowedRoles={['ADMIN', 'TRAINER']} />}>
                        <Route path="/users"           element={<UserList />} />
                        <Route path="/users/:userId"   element={<UserDetail />} />
                    </Route>

                    <Route element={<PrivateRoute allowedRoles={['ADMIN']} />}>
                        <Route path="/admin/users" element={<UserManagement />} />
                    </Route>
                </Routes>
            </AppLayout>
        </Router>
    );
}

export default App;