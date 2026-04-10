// components/Dashboard.js - Role-based Dashboard Router

import React, { useState, useEffect } from 'react';
import ClientDashboard from './ClientDashboard';
import TrainerDashboard from './TrainerDashboard';
import AdminDashboard from './AdminDashboard';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('userRole');

        if (!token) {
            navigate('/login');
            return;
        }

        setUserRole(role);
        setLoading(false);
    }, [navigate]);

    if (loading) {
        return (
            <div data-testid="dashboard-container" className="u-center mt-lg">
                <p className="text-muted">Initializing dashboard grid...</p>
            </div>
        );
    }

    if (!userRole) {
        return (
            <div data-testid="dashboard-container" className="u-center mt-lg">
                <h1 className="headline">Welcome to PEAK</h1>
                <p className="text-muted">Please log in to access your data.</p>
            </div>
        );
    }

    return (
        <div data-testid="dashboard-container">
            {userRole === 'CLIENT' && <ClientDashboard />}
            {userRole === 'TRAINER' && <TrainerDashboard />}
            {userRole === 'ADMIN' && <AdminDashboard />}
        </div>
    );
}

export default Dashboard;