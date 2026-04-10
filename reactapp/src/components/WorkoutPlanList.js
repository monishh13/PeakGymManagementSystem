// components/WorkoutPlanList.js - Workout Discovery

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';

function WorkoutPlanList() {
    const [plans, setPlans] = useState([]);
    const [filteredPlans, setFilteredPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    // Hardcode category pills mapping broadly to difficulty and title for demo
    const pills = ['All Workouts', 'Hypertrophy', 'Endurance', 'Powerlifting', 'Calisthenics', 'Metabolic HIIT'];
    const [activePill, setActivePill] = useState('All Workouts');

    useEffect(() => {
        loadWorkoutPlans();
    }, [currentPage]);

    useEffect(() => {
        filterPlans();
    }, [plans, difficultyFilter, searchTerm, activePill]);

    const loadWorkoutPlans = async () => {
        try {
            setLoading(true);
            const plansData = await api.getWorkoutPlans(currentPage, 20); // pulling more for grid
            if (plansData && plansData.content) {
                setPlans(plansData.content);
                setTotalPages(plansData.totalPages);
            } else {
                setPlans(Array.isArray(plansData) ? plansData : []);
                setTotalPages(1);
            }
        } catch (err) {
            setError(err.message || 'Failed to access library');
        } finally {
            setLoading(false);
        }
    };

    const filterPlans = () => {
        let filtered = plans;
        if (difficultyFilter) {
            filtered = filtered.filter(p => p.difficulty === difficultyFilter);
        }
        if (searchTerm) {
            filtered = filtered.filter(p => 
                (p.title && p.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }
        if (activePill !== 'All Workouts') {
            // Pseudo filter: match keywords in title
            const kw = activePill.toLowerCase().split(' ')[0];
            filtered = filtered.filter(p => p.title && p.title.toLowerCase().includes(kw));
        }
        setFilteredPlans(filtered);
    };

    if (loading) return <p className="text-muted u-center mt-lg">Indexing Plan Library...</p>;
    if (error) return <div className="badge danger mb-lg">{error}</div>;

    const userRole = localStorage.getItem('userRole');

    return (
        <div data-testid="plan-list-container">
            {/* Top Bar with actions */}
            <div className="flex-space mb-md">
                <h2 className="headline" style={{ fontSize: '2rem' }}>Discovery</h2>
                {(userRole === 'ADMIN' || userRole === 'TRAINER') && (
                    <Link to="/workout-plans/create" className="btn small">+ Add Protocol</Link>
                )}
            </div>

            {/* Search and Filters */}
            <div className="flex-space mb-md">
                <input 
                    type="text" 
                    className="input" 
                    placeholder="Search protocols..." 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{ width: '400px' }}
                />
                <select 
                    className="select" 
                    value={difficultyFilter} 
                    onChange={e => setDifficultyFilter(e.target.value)}
                    data-testid="plan-diff-filter"
                >
                    <option value="">All Tiers</option>
                    <option value="BEGINNER">Recruit (Beginner)</option>
                    <option value="INTERMEDIATE">Operative (Inter.)</option>
                    <option value="ADVANCED">Elite (Advanced)</option>
                </select>
            </div>

            {/* Pill Filters */}
            <div className="filters-row">
                {pills.map(pill => (
                    <div 
                        key={pill} 
                        className={`filter-pill ${activePill === pill ? 'active' : ''}`}
                        onClick={() => setActivePill(pill)}
                    >
                        {pill}
                    </div>
                ))}
            </div>

            {/* Plans Grid */}
            <div className="plans-grid">
                {filteredPlans.map(plan => (
                    <div key={plan.planId} className="plan-card">
                        <div className="plan-placeholder-img">
                            {/* Color code background gradient based on difficulty */}
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: plan.difficulty === 'ADVANCED' ? 'linear-gradient(45deg, #ff734a 0%, #111 60%)' : plan.difficulty === 'INTERMEDIATE' ? 'linear-gradient(45deg, #00e5ff 0%, #111 60%)' : 'linear-gradient(45deg, #181818 0%, #0a0a0a 100%)', opacity: 0.3 }} />
                            
                            <span className={`badge ${plan.difficulty === 'ADVANCED' ? 'warning' : plan.difficulty === 'INTERMEDIATE' ? 'primary' : 'neutral'}`} style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                                {plan.difficulty}
                            </span>
                        </div>
                        <div className="plan-card-body">
                            <h3 className="title mb-xs">{plan.title}</h3>
                            <p className="text-muted" style={{ fontSize: '0.875rem', flex: 1, marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {plan.description}
                            </p>
                            <div className="flex-space">
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <span className="text-muted" style={{ fontSize: '0.75rem' }}>⏱ 4 WEEKS</span>
                                </div>
                                <Link to={`/workout-plans/${plan.planId}`} className="btn secondary small">Inspect</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredPlans.length === 0 && (
                <div className="u-center" style={{ padding: '4rem 0' }}>
                    <p className="text-muted">No protocols match the specified parameters.</p>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex-space mt-lg" style={{ justifyContent: 'center', gap: '1rem' }}>
                    <button className="btn secondary small" disabled={currentPage === 0} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
                    <span className="text-muted" style={{ fontSize: '0.875rem' }}>Sector {currentPage + 1} of {totalPages}</span>
                    <button className="btn secondary small" disabled={currentPage >= totalPages - 1} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
                </div>
            )}
        </div>
    );
}

export default WorkoutPlanList;