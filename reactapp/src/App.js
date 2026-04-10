// App.js - Main Application Router

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

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

// Custom hook to hide layout chunks on mobile/landing
const AppLayout = ({ children }) => {
    const location = useLocation();
    const userRole = localStorage.getItem('userRole');
    const username = localStorage.getItem('username') || 'User';

    const isAuthRoute = location.pathname === '/login' || location.pathname === '/landing' || location.pathname === '/mobile-home';

    if (isAuthRoute) {
        return <div className="kv-app-container">{children}</div>;
    }

    return (
        <div className="kv-app-container">
            {/* Fixed Sidebar */}
            <aside className="kv-sidebar">
                <div className="brand-logo">
                    <span className="brand-title">PEAK</span>
                    <span className="brand-subtitle">KINETIC VOLT PRECISION</span>
                </div>

                <div className="nav-links">
                    <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                        Dashboard
                    </Link>
                    {(userRole === 'TRAINER' || userRole === 'ADMIN') && (
                        <Link to="/users" className={`nav-item ${location.pathname.startsWith('/users') || location.pathname.startsWith('/athletes') ? 'active' : ''}`}>
                            Members
                        </Link>
                    )}
                    <Link to="/workout-plans" className={`nav-item ${location.pathname.startsWith('/workout-plans') ? 'active' : ''}`}>
                        Workouts
                    </Link>
                    <Link to={`/progress/${localStorage.getItem('userId')}`} className={`nav-item ${location.pathname.startsWith('/progress') ? 'active' : ''}`}>
                        Analytics
                    </Link>
                    {userRole === 'ADMIN' && (
                        <Link to="/admin/users" className={`nav-item ${location.pathname.startsWith('/admin') ? 'active' : ''}`}>
                            Settings
                        </Link>
                    )}
                </div>

                <div className="sidebar-footer">
                    {userRole === 'TRAINER' && (
                        <Link to="/workout-plans/create" className="btn mb-sm">+ New Workout</Link>
                    )}
                    <div className="user-profile-badge">
                        <div className="avatar">{username.charAt(0).toUpperCase()}</div>
                        <div className="user-details">
                            <span className="user-name">{username}</span>
                            <span className="user-tier">{userRole}</span>
                        </div>
                    </div>
                    {userRole && (
                        <Link to="/login" className="btn secondary small" onClick={() => localStorage.clear()}>
                            Logout
                        </Link>
                    )}
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="kv-main-content">
                <div className="kv-topbar">
                    <div style={{ flex: 1 }}>
                        <input type="text" className="input" placeholder="Search..." style={{ width: '300px' }} />
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

function App() {
    return (
        <Router>
            <AppLayout>
                <div className="container">
                    <Routes>
                        <Route path="/landing" element={<LandingPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/mobile-home" element={<MobileHome />} />
                        
                        <Route element={<PrivateRoute />}>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/workout-plans" element={<WorkoutPlanList />} />
                            <Route path="/workout-plans/:planId" element={<WorkoutPlanDetail />} />
                            <Route path="/progress/:userId" element={<ProgressTracker />} />
                            <Route path="/athletes/:userId" element={<AthleteProfile />} />
                        </Route>

                        <Route element={<PrivateRoute allowedRoles={['ADMIN', 'TRAINER']} />}>
                            <Route path="/users" element={<UserList />} />
                            <Route path="/users/:userId" element={<UserDetail />} />
                        </Route>

                        <Route element={<PrivateRoute allowedRoles={['ADMIN']} />}>
                            <Route path="/admin/users" element={<UserManagement />} />
                        </Route>
                    </Routes>
                </div>
            </AppLayout>
        </Router>
    );
}

export default App;