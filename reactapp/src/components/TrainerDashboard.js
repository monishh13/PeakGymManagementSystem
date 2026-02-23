// components/TrainerDashboard.js - Trainer Interface

import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { api } from '../utils/api';

import './LandingPags.css';



function TrainerDashboard() {

const [clients, setClients] = useState([]);

const [workoutPlans, setWorkoutPlans] = useState([]);

const [loading, setLoading] = useState(true);

const [error, setError] = useState('');



useEffect(() => {

loadTrainerData();

}, []);



const loadTrainerData = async () => {

try {

const [clientsData, plansData] = await Promise.all([

api.getMyClients().catch(() => []),

api.getWorkoutPlans().catch(() => [])

]);



setClients(clientsData);

setWorkoutPlans(plansData);

} catch (err) {

setError(err.message || 'Failed to load trainer data');

} finally {

setLoading(false);

}

};



if (loading) {

return (

<div className="trainer-dashboard">

<div className="card">

<p>Loading trainer data...</p>

</div>

</div>

);

}



if (error) {

return (

<div className="trainer-dashboard">

<div className="badge trainer-error">Error: {error}</div>

</div>

);

}



const activeClients = clients.filter(client => client.status === 'ACTIVE').length;

const totalPlans = workoutPlans.length;

const recentClients = clients.slice(0, 5);



return (

<div className="trainer-dashboard">

<h2 className="h2">Trainer Dashboard</h2>



{/* Overview Metrics */}

<div className="card mb-sm">

<h3 className="h2">Overview</h3>

<div className="trainer-metrics">

<div className="metric">

<span className="num">{clients.length}</span>

<span className="label">Total Clients</span>

</div>

<div className="metric">

<span className="num">{activeClients}</span>

<span className="label">Active Clients</span>

</div>

<div className="metric">

<span className="num">{totalPlans}</span>

<span className="label">Workout Plans</span>

</div>

<div className="metric">

<span className="num">{recentClients.length}</span>

<span className="label">Recent Activity</span>

</div>

</div>

</div>



{/* My Clients */}

<div className="card mb-sm">

<div className="section-header">

<h3 className="h2">My Clients</h3>

<Link to="/users" className="btn secondary">View All</Link>

</div>



{clients.length > 0 ? (

<div className="clients-grid">

{recentClients.map(client => (

<div key={client.userId} className="client-card">

<div className="client-info">

<strong>{client.username}</strong>

<p className="small u-muted">{client.email}</p>

</div>

<div className="client-actions">

<Link

to={`/users/${client.userId}`}

className="btn secondary small"

>

View Progress

</Link>

</div>

</div>

))}

</div>

) : (

<div className="empty-state">

<p className="u-muted">No clients assigned yet.</p>

<p className="small">Contact your administrator to get clients assigned.</p>

</div>

)}

</div>



{/* Workout Plans */}

<div className="card mb-sm">

<div className="section-header">

<h3 className="h2">My Workout Plans</h3>

<Link to="/workout-plans" className="btn secondary">Manage Plans</Link>

</div>



{workoutPlans.length > 0 ? (

<div className="plans-grid">

{workoutPlans.slice(0, 4).map(plan => (

<div key={plan.planId} className="plan-card">

<div className="plan-header">

<strong>{plan.title}</strong>

<span className="badge difficulty-badge">{plan.difficulty}</span>

</div>

<p className="small plan-description">{plan.description}</p>

<div className="plan-meta">

<span className="small u-muted">

Created: {new Date(plan.creationDate).toLocaleDateString()}

</span>

</div>

<Link

to={`/workout-plans/${plan.planId}`}

className="btn secondary small"

>

View Details

</Link>

</div>

))}

</div>

) : (

<div className="empty-state">

<p className="u-muted">No workout plans created yet.</p>

<Link to="/workout-plans" className="btn">Create Your First Plan</Link>

</div>

)}

</div>



{/* Quick Actions */}

<div className="card">

<h3 className="h2">Quick Actions</h3>

<div className="action-buttons">

<Link to="/workout-plans" className="btn">Create Workout Plan</Link>

<Link to="/users" className="btn secondary">Manage Clients</Link>

<Link to="/exercises" className="btn secondary">Browse Exercises</Link>

</div>

</div>

</div>

);

}



export default TrainerDashboard;