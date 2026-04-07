// App.js - Main Application Router

import React from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Dashboard from './components/Dashboard';

import UserList from './components/UserList';

import UserDetail from './components/UserDetail';

import WorkoutPlanList from './components/WorkoutPlanList';

import WorkoutPlanDetail from './components/WorkoutPlanDetail';

import ProgressTracker from './components/ProgressTracker';

import LoginPage from './components/LoginPage';

import LandingPage from './components/LandingPage';
import PrivateRoute from './components/PrivateRoute';
import './components/theme.css';



function App() {

    const userRole = localStorage.getItem('userRole');



    return (

        <Router>

            <div className="App">

                {/* Navigation Bar */}

                <nav className="navbar">

                    <div className="brand">

                        <div className="dot"></div>

                        <span>PEAK Fitness</span>

                        </div>

                        <div className="nav-links">

                            <Link to="/">Dashboard</Link>

                            {(userRole === 'TRAINER' || userRole === 'ADMIN') && (

                                <Link to="/users">Users</Link>

                            )}

                            <Link to="/workout-plans">Workout Plans</Link>

                            {userRole ? (

                                <Link to="/login" onClick={() => localStorage.clear()}>Logout</Link>

                            ) : (

                                <Link to="/login">Login</Link>

                            )}

                            </div>

                            </nav>



                            <div className="container">
                                <Routes>
                                    <Route path="/landing" element={<LandingPage />} />
                                    <Route path="/login" element={<LoginPage />} />
                                    
                                    <Route element={<PrivateRoute />}>
                                        <Route path="/" element={<Dashboard />} />
                                        <Route path="/workout-plans" element={<WorkoutPlanList />} />
                                        <Route path="/workout-plans/:planId" element={<WorkoutPlanDetail />} />
                                        <Route path="/progress/:userId" element={<ProgressTracker />} />
                                    </Route>

                                    <Route element={<PrivateRoute allowedRoles={['ADMIN', 'TRAINER']} />}>
                                        <Route path="/users" element={<UserList />} />
                                        <Route path="/users/:userId" element={<UserDetail />} />
                                    </Route>
                                </Routes>
                            </div>

                                    </div>

                                    </Router>

    );

    }



    export default App;