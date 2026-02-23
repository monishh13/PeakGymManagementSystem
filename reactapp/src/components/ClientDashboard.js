// components/ClientDashboard.js - Client Interface

import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { api } from '../utils/api';

import './LandingPags.css';



function ClientDashboard() {

const [workoutPlan, setWorkoutPlan] = useState(null);

const [progress, setProgress] = useState(null);

const [loading, setLoading] = useState(true);

const [error, setError] = useState('');



useEffect(() => {

loadClientData();

}, []);



const loadClientData = async () => {

try {

const userId = localStorage.getItem('userId');

const [planData, progressData] = await Promise.all([

api.getMyWorkoutPlan().catch(() => null),

api.getUserProgress(userId).catch(() => [])

]);



setWorkoutPlan(planData);

setProgress(progressData);

} catch (err) {

setError(err.message || 'Failed to load data');

} finally {

setLoading(false);

}

};



if (loading) {

return (

<div className="client-dashboard">

<div className="card">

<p>Loading your workout data...</p>

</div>

</div>

);

}



if (error) {

return (

<div className="client-dashboard">

<div className="badge client-error">Error: {error}</div>

</div>

);

}



const progressSummary = Array.isArray(progress) ? {

completedWorkouts: progress.length,

currentStreak: progress.filter(p => p.completionPercentage >= 100).length,

totalWeight: progress.reduce((sum, p) => sum + (p.totalWeight || 0), 0),

avgCompletion: progress.length > 0 ?

Math.round(progress.reduce((sum, p) => sum + p.completionPercentage, 0) / progress.length) : 0

} : {

completedWorkouts: 0,

currentStreak: 0,

totalWeight: 0,

avgCompletion: 0

};



return (

<div className="client-dashboard">

<h2 className="h2">Client Dashboard</h2>



{/* Today's Workout Plan */}

<div className="card mb-sm">

<h3 className="h2">Today's Workout</h3>

{workoutPlan ? (

<div className="workout-preview">

<div className="workout-header">

<strong className="workout-title">{workoutPlan.title}</strong>

<span className="badge difficulty-badge">{workoutPlan.difficulty}</span>

</div>

<p className="small workout-description">{workoutPlan.description}</p>



{workoutPlan.exercises && workoutPlan.exercises.length > 0 && (

<div className="exercises-preview">

<h4 className="small">Next Exercises:</h4>

<div className="exercises">

{workoutPlan.exercises.slice(0, 3).map((exercise, index) => (

<div key={exercise.id || index} className="exercise">

<strong>{exercise.name}</strong>

<p className="small">{exercise.sets} sets × {exercise.reps} reps</p>

{exercise.restTimeSeconds && (

<p className="small u-muted">Rest: {exercise.restTimeSeconds}s</p>

)}

</div>

))}

</div>

</div>

)}



<Link to={`/workout-plans/${workoutPlan.planId}`} className="btn">

View Full Plan

</Link>

</div>

) : (

<div className="empty-state">

<p className="u-muted">No workout plan assigned yet.</p>

<p className="small">Contact your trainer to get started!</p>

</div>

)}

</div>



{/* Progress Summary */}

<div className="card mb-sm">

<h3 className="h2">Progress Summary</h3>

<div className="progress-grid">

<div className="metric">

<span className="num">{progressSummary.completedWorkouts}</span>

<span className="label">Total Workouts</span>

</div>

<div className="metric">

<span className="num">{progressSummary.currentStreak}</span>

<span className="label">Completed Plans</span>

</div>

<div className="metric">

<span className="num">{progressSummary.totalWeight}kg</span>

<span className="label">Total Weight Lifted</span>

</div>

<div className="metric">

<span className="num">{progressSummary.avgCompletion}%</span>

<span className="label">Avg Completion</span>

</div>

</div>

<Link

to={`/progress/${localStorage.getItem('userId')}`}

className="btn secondary mt-sm"

>

View Detailed Progress

</Link>

</div>



{/* Quick Actions */}

<div className="card">

<h3 className="h2">Quick Actions</h3>

<div className="action-buttons">

<Link to="/workout-plans" className="btn secondary">Browse Plans</Link>

{workoutPlan && (

<Link to={`/progress/${localStorage.getItem('userId')}`} className="btn secondary">

Log Progress

</Link>

)}

</div>

</div>

</div>

);

}



export default ClientDashboard;