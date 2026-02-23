// components/Dashboard.js - Role-based Dashboard

import React, { useState, useEffect } from 'react';

import ClientDashboard from './ClientDashboard';

import TrainerDashboard from './TrainerDashboard';

import AdminDashboard from './AdminDashboard';

import { useNavigate } from 'react-router-dom';

import './LandingPags.css';

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

            <div data-testid="dashboard-container" className="u-center">

                <div className="card">

                    <p>Loading dashboard...</p>

                    </div>

                    </div>

        );

    }



    if (!userRole) {

        return (

            <div data-testid="dashboard-container" className="u-center">

                <div className="card">

                    <h1 className="h1">Welcome to PEAK Fitness</h1>

                    <p>Please log in to access your dashboard.</p>

                    </div>

                    </div>

        );

    }



    return (

        <div data-testid="dashboard-container">

            <h1 className="h1">

                Welcome to Your Dashboard, {localStorage.getItem('username')}

                </h1>



                {userRole === 'CLIENT' && <ClientDashboard />}

                {userRole === 'TRAINER' && <TrainerDashboard />}

                {userRole === 'ADMIN' && <AdminDashboard />}

                </div>

    );

    }



    export default Dashboard;