// components/LandingPage.js - Welcome Page

import React from 'react';

import { Link } from 'react-router-dom';

import './LandingPags.css';



function LandingPage() {

    return (

        <div className="center-page">

            <div className="card landing-card">

                <h1 className="h1">Welcome to PEAK Fitness Management</h1>

                <p className="small">

                    Your comprehensive solution for managing gym operations, workout plans,

                    and client progress tracking.

                    </p>



                    <div className="landing-metrics">

                        <div className="metric">

                            <span className="num">Personalized</span>

                            <span className="label">Workout Plans</span>

                            </div>

                            <div className="metric">

                                <span className="num">Real-time</span>

                                <span className="label">Progress Tracking</span>

                                </div>

                                <div className="metric">

                                    <span className="num">Role-based</span>

                                    <span className="label">Access Control</span>

                                    </div>

                                    </div>



                                    <div className="landing-actions">

                                        <Link to="/login" className="btn">Login</Link>

                                        <Link to="/register" className="btn secondary">Register</Link>

                                        </div>



                                        <div className="mt-md">

                                            <h2 className="h2">Key Features</h2>

                                            <ul className="features-list">

                                                <li>Application tracking and status monitoring</li>

                                                <li>Comprehensive workout plan management</li>

                                                <li>Role-based dashboards for Clients, Trainers, and Admins</li>

                                                <li>Progress analytics and reporting</li>

                                                <li>Exercise database management</li>

                                                <li>Automated notifications and reminders</li>

                                                </ul>

                                                </div>

                                                </div>

                                                </div>

    );

}



export default LandingPage;