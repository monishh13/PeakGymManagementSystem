// components/WorkoutPlanDetail.js - Workout Plan Details

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../utils/api';

function WorkoutPlanDetail() {
    const { planId } = useParams();
    const navigate = useNavigate();
    const [plan, setPlan] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const userRole = localStorage.getItem('userRole');

    useEffect(() => {
        loadPlanDetails();
    }, [planId]);

    const loadPlanDetails = async () => {
        try {
            setLoading(true);
            const planData = await api.getWorkoutPlan(planId);
            setPlan(planData);
            if (planData.exercises) {
                setExercises(planData.exercises);
            } else {
                const exercisesData = await api.getExercises(planId).catch(() => []);
                setExercises(exercisesData);
            }
        } catch (err) {
            setError(err.message || 'Failed to load plan parameters');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="text-muted u-center mt-lg">Decoding plan blueprint...</p>;
    if (error) return <div className="badge danger mb-lg">{error}</div>;
    if (!plan) return <div className="badge warning mb-lg">Protocol Not Found</div>;

    return (
        <div data-testid="plan-detail-container">
            <div className="flex-space mb-md">
                <button className="btn secondary small" onClick={() => navigate('/workout-plans')}>← Back to Library</button>
                {(userRole === 'ADMIN' || userRole === 'TRAINER') && (
                    <Link to={`/workout-plans/${planId}/edit`} className="btn small">Modify Protocol</Link>
                )}
            </div>

            {/* Dark Hero Header */}
            <div className="hero-banner" style={{ minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'var(--kv-surface-container-high)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex-space" style={{ alignItems: 'flex-start' }}>
                    <div>
                        <div className={`badge ${plan.difficulty === 'ADVANCED' ? 'warning' : 'primary'} mb-sm`}>
                            {plan.difficulty}
                        </div>
                        <h1 className="display" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{plan.title}</h1>
                        <p className="text-muted" style={{ maxWidth: '700px', fontSize: '1.125rem' }}>{plan.description}</p>
                    </div>
                </div>
            </div>

            {/* Exercise Syllabus */}
            <h3 className="title mb-md mt-lg" style={{ borderBottom: '1px solid var(--kv-outline-variant)', paddingBottom: '0.5rem' }}>Exercise Sequence</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {exercises.length > 0 ? exercises.map((ex, index) => (
                    <div key={ex.id || index} className="card" style={{ display: 'flex', alignItems: 'stretch', gap: '1.5rem', padding: '1.25rem', marginBottom: 0 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minWidth: '60px', borderRight: '1px solid var(--kv-surface-container-highest)', paddingRight: '1.5rem' }}>
                            <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Phase</span>
                            <span className="display" style={{ fontSize: '2rem', color: 'var(--kv-primary)' }}>0{index + 1}</span>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h4 style={{ fontWeight: 600, fontSize: '1.25rem', marginBottom: '0.25rem' }}>{ex.name}</h4>
                            <p className="text-muted" style={{ fontSize: '0.875rem' }}>{ex.description || 'Target specific muscular recruitment.'}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', paddingLeft: '1.5rem', borderLeft: '1px solid var(--kv-surface-container-highest)' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Sets</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{ex.sets}</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Reps</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{ex.reps}</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Rest</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--kv-secondary)' }}>{ex.restTimeSeconds || 60}s</div>
                            </div>
                        </div>
                    </div>
                )) : (
                    <p className="text-muted">No tactical exercises mapped to this protocol yet.</p>
                )}
            </div>
            
            {userRole === 'CLIENT' && (
                <button className="btn mt-lg" style={{ width: '100%' }}>Initiate Sequence Now</button>
            )}
        </div>
    );
}

export default WorkoutPlanDetail;