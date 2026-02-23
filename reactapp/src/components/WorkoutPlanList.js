// components/WorkoutPlanList.js - Workout Plans Management

import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { api } from '../utils/api';

import './LandingPags.css';



function WorkoutPlanList() {

    const [plans, setPlans] = useState([]);

    const [filteredPlans, setFilteredPlans] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState('');

    const [difficultyFilter, setDifficultyFilter] = useState('');

    const [searchTerm, setSearchTerm] = useState('');



    useEffect(() => {

        loadWorkoutPlans();

    }, []);



    useEffect(() => {

        filterPlans();

    }, [plans, difficultyFilter, searchTerm]);



    const loadWorkoutPlans = async () => {

        try {

            const plansData = await api.getWorkoutPlans();

            setPlans(plansData);

        } catch (err) {

            setError(err.message || 'Failed to fetch plans');

        } finally {

            setLoading(false);

        }

    };



    const filterPlans = () => {

        let filtered = plans;
        if (difficultyFilter) {
            filtered = filtered.filter(plan => plan.difficulty === difficultyFilter);
        }
        if (searchTerm) {
            filtered = filtered.filter(plan =>
                plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                plan.description.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
            setFilteredPlans(filtered);
        };
        const handleDifficultyFilterChange = (e) => {
            setDifficultyFilter(e.target.value);
        };
        const handleSearchChange = (e) => {
            setSearchTerm(e.target.value);
        };

        if (loading) {
            return (
                <div data-testid="plan-list-container" className="workout-plan-list">
                    <div className="card">
                        <p>Loading workout plans...</p>
                        </div>

                        </div>

            );

        }



        if (error) {

            return (

                <div data-testid="plan-list-container" className="workout-plan-list">

                    <div className="card">

                        <div className="badge plan-list-error">

                            {error}

                            </div>

                            </div>

                            </div>

            );

        }



        return (

            <div data-testid="plan-list-container" className="workout-plan-list">

                <div className="plan-list-header">

                    <h1 className="h1">Workout Plans</h1>

                    <Link to="/workout-plans/create" className="btn">Create New Plan</Link>

                    </div>



                    {/* Filters */}

                    <div className="card plan-filters">

                        <div className="filter-row">

                            <div className="filter-group">

                                <label htmlFor="search-plans">Search Plans</label>

                                <input

                                id="search-plans"

                                type="text"

                                className="input"

                                placeholder="Search by title or description..."

                                value={searchTerm}

                                onChange={handleSearchChange}

                                />

                                </div>

                                <div className="filter-group">

                                    <label htmlFor="difficulty-filter">Filter by Difficulty</label>

                                    <select

                                    id="difficulty-filter"

                                    data-testid="plan-diff-filter"

                                    className="input"

                                    value={difficultyFilter}

                                    onChange={handleDifficultyFilterChange}

                                    >

                                        <option value="">All Difficulties</option>

                                        <option value="BEGINNER">Beginner</option>

                                        <option value="INTERMEDIATE">Intermediate</option>

                                        <option value="ADVANCED">Advanced</option>

                                        </select>

                                        </div>

                                        </div>

                                        </div>



                                        {/* Plans Grid */}

                                        <div className="plans-container">

                                            {filteredPlans.length === 0 ? (

                                                <div className="card empty-state">

                                                    <h3 className="h2">No workout plans found</h3>

                                                    {(difficultyFilter || searchTerm) ? (

                                                        <div>

                                                            <p className="u-muted">Try adjusting your filters</p>

                                                            <button

                                                            className="btn secondary"

                                                            onClick={() => {

                                                                setDifficultyFilter('');

                                                                setSearchTerm('');

                                                            }}

                                                            >

                                                                Clear Filters

                                                                </button>

                                                                </div>

                                                    ) : (

                                                        <div>

                                                            <p className="u-muted">Get started by creating your first workout plan</p>

                                                            <Link to="/workout-plans/create" className="btn">

                                                                Create Workout Plan

                                                                </Link>

                                                                </div>

                                                    )}

                                                    </div>

                                                    ) : (

                                                        <div className="plans-grid">

                                                            {filteredPlans.map(plan => (

                                                                <div key={plan.planId} className="card plan-card">

                                                                    <div className="plan-header">

                                                                        <h3 className="plan-title">{plan.title}</h3>

                                                                        <span className={`badge difficulty-${plan.difficulty.toLowerCase()}`}>

                                                                            {plan.difficulty}

                                                                            </span>

                                                                            </div>



                                                                            <p className="plan-description">{plan.description}</p>



                                                                            <div className="plan-meta">

                                                                                <div className="meta-row">

                                                                                    <span className="label">Created by:</span>

                                                                                    <span className="value">{plan.createdBy?.username || 'Unknown'}</span>

                                                                                    </div>

                                                                                    <div className="meta-row">

                                                                                        <span className="label">Created:</span>

                                                                                        <span className="value">

                                                                                            {new Date(plan.creationDate).toLocaleDateString()}

                                                                                            </span>

                                                                                            </div>

                                                                                            </div>



                                                                                            <div className="plan-actions">

                                                                                                <Link

                                                                                                to={`/workout-plans/${plan.planId}`}

                                                                                                className="btn secondary"

                                                                                                >

                                                                                                    View Details

                                                                                                    </Link>

                                                                                                    <Link

                                                                                                    to={`/workout-plans/${plan.planId}/edit`}

                                                                                                    className="btn secondary"

                                                                                                    >

                                                                                                        Edit

                                                                                                        </Link>

                                                                                                        </div>

                                                                                                        </div>

                                                            ))}

                                                            </div>

                                                    )}

                                                    </div>



                                                    {/* Summary Stats */}

                                                    <div className="card plan-stats">

                                                        <h3 className="h2">Plan Statistics</h3>

                                                        <div className="stats-grid">

                                                            <div className="metric">

                                                                <span className="num">{plans.length}</span>

                                                                <span className="label">Total Plans</span>

                                                                </div>

                                                                <div className="metric">

                                                                    <span className="num">{plans.filter(p => p.difficulty === 'BEGINNER').length}</span>

                                                                    <span className="label">Beginner</span>

                                                                    </div>

                                                                    <div className="metric">

                                                                        <span className="num">{plans.filter(p => p.difficulty === 'INTERMEDIATE').length}</span>

                                                                        <span className="label">Intermediate</span>

                                                                        </div>

                                                                        <div className="metric">

                                                                            <span className="num">{plans.filter(p => p.difficulty === 'ADVANCED').length}</span>

                                                                            <span className="label">Advanced</span>

                                                                            </div>

                                                                            </div>

                                                                            </div>

                                                                            </div>

        );

                                                            }



                                                            export default WorkoutPlanList;