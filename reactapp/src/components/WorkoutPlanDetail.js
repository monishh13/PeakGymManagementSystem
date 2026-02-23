// components/WorkoutPlanDetail.js - Workout Plan Detail View

import React, { useState, useEffect } from 'react';

import { useParams, Link } from 'react-router-dom';

import { api } from '../utils/api';

import './LandingPags.css';



function WorkoutPlanDetail() {

    const { planId } = useParams();

    const [plan, setPlan] = useState(null);

    const [exercises, setExercises] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState('');



    useEffect(() => {

        if (planId) {

            loadPlanDetail();

            }

            }, [planId]);



            const loadPlanDetail = async () => {

                try {

                    const [planData, exercisesData] = await Promise.all([

                        api.getWorkoutPlan(planId),

                        api.getExercises(planId).catch(() => [])

                    ]);



                    setPlan(planData);

                    setExercises(exercisesData);

                } catch (err) {

                    setError(err.message || 'Workout plan not found');

                } finally {

                    setLoading(false);

                }

            };



            if (loading) {

                return (

                    <div className="workout-plan-detail">

                        <div className="card">

                            <p>Loading workout plan...</p>

                            </div>

                            </div>

                            );

                }



                if (error) {

                    return (

                        <div className="workout-plan-detail">

                            <div className="card">

                                <div className="badge plan-error">

                                    {error}

                                    </div>

                                    <Link to="/workout-plans" className="btn secondary mt-sm">

                                        Back to Plans

                                        </Link>

                                        </div>

                                        </div>

                    );

                }



                if (!plan) {

                    return (

                        <div className="workout-plan-detail">

                            <div className="card">

                                <p>Plan not found</p>

                                <Link to="/workout-plans" className="btn secondary">

                                    Back to Plans

                                    </Link>

                                    </div>

                                    </div>

                    );

                }



                return (

                    <div className="workout-plan-detail">

                        <div className="plan-header">

                            <Link to="/workout-plans" className="btn secondary">← Back to Plans</Link>

                            <h1 className="h1">Workout Plan Details</h1>

                            </div>



                            {/* Plan Information */}

                            <div className="card plan-info-card">

                                <div className="plan-title-section">

                                    <div className="plan-title-group">

                                        <h2 className="h1 plan-title">{plan.title}</h2>

                                        <span className={`badge difficulty-${plan.difficulty.toLowerCase()}`}>

                                            {plan.difficulty}

                                            </span>

                                            </div>

                                            </div>



                                            <p className="plan-description">{plan.description}</p>



                                            <div className="plan-meta-grid">

                                                <div className="meta-item">

                                                    <span className="label">Created by:</span>

                                                    <span className="value">{plan.createdBy?.username || 'Unknown'}</span>

                                                    </div>

                                                    <div className="meta-item">

                                                        <span className="label">Created:</span>

                                                        <span className="value">

                                                            {new Date(plan.creationDate).toLocaleDateString()}

                                                            </span>

                                                            </div>

                                                            <div className="meta-item">

                                                                <span className="label">Plan ID:</span>

                                                                <span className="value">{plan.planId}</span>

                                                                </div>

                                                                <div className="meta-item">

                                                                    <span className="label">Total Exercises:</span>

                                                                    <span className="value">{exercises.length}</span>

                                                                    </div>

                                                                    </div>

                                                                    </div>



                                                                    {/* Exercises Section */}

                                                                    <div className="card exercises-section">

                                                                        <div className="section-header">

                                                                            <h3 className="h2">Exercises ({exercises.length})</h3>

                                                                            <Link

                                                                            to={`/workout-plans/${planId}/add-exercise`}

                                                                            className="btn secondary"

                                                                            >

                                                                                Add Exercise

                                                                                </Link>

                                                                                </div>



                                                                                {exercises.length === 0 ? (

                                                                                    <div className="empty-state">

                                                                                        <h4 className="h2">No exercises in this plan</h4>

                                                                                        <p className="u-muted">Add exercises to get started with this workout plan.</p>

                                                                                        <Link

                                                                                        to={`/workout-plans/${planId}/add-exercise`}

                                                                                        className="btn"

                                                                                        >

                                                                                            Add First Exercise

                                                                                            </Link>

                                                                                            </div>

                                                                                ) : (

                                                                                    <div className="exercises-list">

                                                                                        {exercises.map((exercise, index) => (

                                                                                            <div key={exercise.exerciseId || index} className="exercise-card">

                                                                                                <div className="exercise-header">

                                                                                                    <div className="exercise-number">

                                                                                                        <span>{index + 1}</span>

                                                                                                        </div>

                                                                                                        <div className="exercise-info">

                                                                                                            <h4 className="exercise-name">{exercise.name}</h4>

                                                                                                            <p className="exercise-description">{exercise.description}</p>

                                                                                                            </div>

                                                                                                            </div>



                                                                                                            <div className="exercise-details">

                                                                                                                <div className="exercise-stats">

                                                                                                                    <div className="stat-item">

                                                                                                                        <span className="stat-label">Sets:</span>

                                                                                                                        <span className="stat-value">{exercise.sets}</span>

                                                                                                                        </div>

                                                                                                                        <div className="stat-item">

                                                                                                                            <span className="stat-label">Reps:</span>

                                                                                                                            <span className="stat-value">{exercise.reps}</span>

                                                                                                                            </div>

                                                                                                                            {exercise.restTimeSeconds && (

                                                                                                                                <div className="stat-item">

                                                                                                                                    <span className="stat-label">Rest:</span>

                                                                                                                                    <span className="stat-value">{exercise.restTimeSeconds}s</span>

                                                                                                                                    </div>

                                                                                                                            )}

                                                                                                                            </div>



                                                                                                                            {exercise.targetMuscles && (

                                                                                                                                <div className="target-muscles">

                                                                                                                                    <span className="label">Target Muscles:</span>

                                                                                                                                    <span className="value">{exercise.targetMuscles}</span>

                                                                                                                                    </div>

                                                                                                                            )}

                                                                                                                            </div>



                                                                                                                            <div className="exercise-actions">

                                                                                                                                <button className="btn secondary small">

                                                                                                                                    Edit Exercise

                                                                                                                                    </button>

                                                                                                                                    <button className="btn secondary small danger">

                                                                                                                                        Remove

                                                                                                                                        </button>

                                                                                                                                        </div>

                                                                                                                                        </div>

                                                                                        ))}

                                                                                        </div>

                                                                                )}

                                                                                </div>



                                                                                {/* Action Buttons */}

                                                                                <div className="card plan-actions">

                                                                                    <h3 className="h2">Plan Actions</h3>

                                                                                    <div className="action-buttons">

                                                                                        <Link

                                                                                        to={`/workout-plans/${planId}/edit`}

                                                                                        className="btn"

                                                                                        >

                                                                                            Edit Plan

                                                                                            </Link>

                                                                                            <Link

                                                                                            to={`/workout-plans/${planId}/assign`}

                                                                                            className="btn secondary"

                                                                                            >

                                                                                                Assign to Client

                                                                                                </Link>

                                                                                                <button className="btn secondary" onClick={loadPlanDetail}>

                                                                                                    Refresh Data

                                                                                                    </button>

                                                                                                    <button className="btn secondary danger">

                                                                                                        Delete Plan

                                                                                                        </button>

                                                                                                        </div>

                                                                                                        </div>

                                                                                                        </div>

                );

                                                                                                                            }



                                                                                                                            export default WorkoutPlanDetail;