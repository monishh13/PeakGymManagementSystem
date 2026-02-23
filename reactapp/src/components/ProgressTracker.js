// components/ProgressTracker.js - Progress Tracking Component

import React, { useState, useEffect } from 'react';

import { useParams, Link } from 'react-router-dom';

import { api } from '../utils/api';

import './LandingPags.css';


function ProgressTracker() {

const { userId } = useParams();

const [progressData, setProgressData] = useState([]);

const [loading, setLoading] = useState(true);

const [error, setError] = useState('');

const [updating, setUpdating] = useState({});



useEffect(() => {

if (userId) {

loadProgress();

}

}, [userId]);



const loadProgress = async () => {

try {

const data = await api.getUserProgress(userId);

setProgressData(Array.isArray(data) ? data : []);

} catch (err) {

setError(err.message || 'Not found');

} finally {

setLoading(false);

}

};



const handleUpdateProgress = async (progressId) => {

setUpdating(prev => ({ ...prev, [progressId]: true }));



try {

// Simulate incrementing progress by 10%

const currentProgress = progressData.find(p => p.progressId === progressId);

const newPercentage = Math.min(currentProgress.completionPercentage + 10, 100);



const updatedProgress = await api.updateUserProgress(progressId, {

completionPercentage: newPercentage,

lastUpdated: new Date().toISOString().split('T')[0]

});



// Update local state

setProgressData(prev =>

prev.map(p =>

p.progressId === progressId ? updatedProgress : p

)

);

} catch (err) {

console.error('Failed to update progress:', err);

} finally {

setUpdating(prev => ({ ...prev, [progressId]: false }));

}

};



if (loading) {

return (

<div className="progress-tracker">

<div className="card">

<p>Loading progress data...</p>

</div>

</div>

);

}



if (error) {

return (

<div className="progress-tracker">

<div className="card">

<div className="badge progress-error">

{error}

</div>

<Link to="/users" className="btn secondary mt-sm">

Back to Users

</Link>

</div>

</div>

);

}



return (

<div className="progress-tracker">

<div className="progress-header">

<Link to="/users" className="btn secondary">← Back</Link>

<h1 className="h1">Progress Tracker</h1>

</div>



{progressData.length === 0 ? (

<div className="card">

<div className="empty-state">

<h3 className="h2">No Assigned Plans</h3>

<p className="u-muted">This user doesn't have any workout plans assigned yet.</p>

<Link to="/workout-plans" className="btn">

Browse Workout Plans

</Link>

</div>

</div>

) : (

<div className="progress-list">

{progressData.map(progress => (

<div key={progress.progressId} className="card progress-card">

<div className="progress-plan-header">

<div className="plan-info">

<h3 className="h2">{progress.workoutPlan?.title || 'Workout Plan'}</h3>

<span className="badge difficulty-badge">

{progress.workoutPlan?.difficulty || 'BEGINNER'}

</span>

</div>

<div className="progress-percentage">

<span className="progress-value">{progress.completionPercentage}%</span>

</div>

</div>



<div className="progress-bar-section">

<div className="progress-bar-container">

<div

className="progress-bar"

data-testid={`progress-bar-${progress.progressId}`}

style={{ width: `${progress.completionPercentage}%` }}

></div>

</div>

</div>



<div className="progress-details">

<div className="progress-meta">

<div className="meta-item">

<span className="label">Last Updated:</span>

<span className="value">

{progress.lastUpdated ?

new Date(progress.lastUpdated).toLocaleDateString() :

'Never'}

</span>

</div>

{progress.assignedDate && (

<div className="meta-item">

<span className="label">Assigned:</span>

<span className="value">

{new Date(progress.assignedDate).toLocaleDateString()}

</span>

</div>

)}

</div>



<div className="progress-actions">

<button

className="btn"

data-testid={`update-progress-btn-${progress.progressId}`}

onClick={() => handleUpdateProgress(progress.progressId)}

disabled={

updating[progress.progressId] ||

progress.completionPercentage >= 100

}

>

{updating[progress.progressId] ? (

<>

<span className="loading-spinner"></span>

Updating...

</>

) : progress.completionPercentage >= 100 ? (

'Completed'

) : (

'Update Progress (+10%)'

)}

</button>



<Link

to={`/workout-plans/${progress.workoutPlan?.planId}`}

className="btn secondary"

>

View Plan Details

</Link>

</div>

</div>

</div>

))}

</div>

)}



{/* Progress Summary */}

{progressData.length > 0 && (

<div className="card progress-summary">

<h3 className="h2">Progress Summary</h3>

<div className="summary-grid">

<div className="metric">

<span className="num">{progressData.length}</span>

<span className="label">Total Plans</span>

</div>

<div className="metric">

<span className="num">

{progressData.filter(p => p.completionPercentage >= 100).length}

</span>

<span className="label">Completed</span>

</div>

<div className="metric">

<span className="num">

{progressData.filter(p => p.completionPercentage > 0 && p.completionPercentage < 100).length}

</span>

<span className="label">In Progress</span>

</div>

<div className="metric">

<span className="num">

{Math.round(

progressData.reduce((sum, p) => sum + p.completionPercentage, 0) / progressData.length

)}%

</span>

<span className="label">Avg Progress</span>

</div>

</div>

</div>

)}

</div>

);

}



export default ProgressTracker;