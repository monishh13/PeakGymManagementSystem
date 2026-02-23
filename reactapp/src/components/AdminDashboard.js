// components/AdminDashboard.js - Admin Interface

import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { api } from '../utils/api';

import './LandingPags.css';


function AdminDashboard() {

const [users, setUsers] = useState([]);

const [workoutPlans, setWorkoutPlans] = useState([]);

const [systemStats, setSystemStats] = useState({});

const [loading, setLoading] = useState(true);

const [error, setError] = useState('');



useEffect(() => {

loadAdminData();

}, []);



const loadAdminData = async () => {

try {

const [usersData, plansData] = await Promise.all([

api.getUsers().catch(() => []),

api.getWorkoutPlans().catch(() => [])

]);



setUsers(usersData);

setWorkoutPlans(plansData);



// Calculate system statistics

const stats = calculateSystemStats(usersData, plansData);

setSystemStats(stats);

} catch (err) {

setError(err.message || 'Failed to load admin data');

} finally {

setLoading(false);

}

};



const calculateSystemStats = (users, plans) => {

const clients = users.filter(user => user.role === 'CLIENT');

const trainers = users.filter(user => user.role === 'TRAINER');

const admins = users.filter(user => user.role === 'ADMIN');



return {

totalUsers: users.length,

totalClients: clients.length,

totalTrainers: trainers.length,

totalAdmins: admins.length,

totalPlans: plans.length,

recentUsers: users.slice(0, 5),

recentPlans: plans.slice(0, 3)

};

};



if (loading) {

return (

<div className="admin-dashboard">

<div className="card">

<p>Loading admin dashboard...</p>

</div>

</div>

);

}



if (error) {

return (

<div className="admin-dashboard">

<div className="badge admin-error">Error: {error}</div>

</div>

);

}



return (

<div className="admin-dashboard">

<h2 className="h2">Admin Dashboard</h2>



{/* System Overview */}

<div className="card mb-sm">

<h3 className="h2">System Overview</h3>

<div className="admin-metrics">

<div className="metric">

<span className="num">{systemStats.totalUsers}</span>

<span className="label">Total Users</span>

</div>

<div className="metric">

<span className="num">{systemStats.totalClients}</span>

<span className="label">Clients</span>

</div>

<div className="metric">

<span className="num">{systemStats.totalTrainers}</span>

<span className="label">Trainers</span>

</div>

<div className="metric">

<span className="num">{systemStats.totalPlans}</span>

<span className="label">Workout Plans</span>

</div>

</div>

</div>



{/* User Management */}

<div className="card mb-sm">

<div className="section-header">

<h3 className="h2">User Management</h3>

<Link to="/users" className="btn secondary">Manage All Users</Link>

</div>



{systemStats.recentUsers && systemStats.recentUsers.length > 0 ? (

<div className="users-table">

<table className="table">

<thead>

<tr>

<th>Name</th>

<th>Email</th>

<th>Role</th>

<th>Join Date</th>

<th>Actions</th>

</tr>

</thead>

<tbody>

{systemStats.recentUsers.map(user => (

<tr key={user.userId}>

<td>{user.username}</td>

<td>{user.email}</td>

<td>

<span className={`badge role-${user.role.toLowerCase()}`}>

{user.role}

</span>

</td>

<td>{new Date(user.joinDate).toLocaleDateString()}</td>

<td>

<Link

to={`/users/${user.userId}`}

className="btn secondary small"

>

View

</Link>

</td>

</tr>

))}

</tbody>

</table>

</div>

) : (

<div className="empty-state">

<p className="u-muted">No users found in the system.</p>

</div>

)}

</div>



{/* Workout Plans Management */}

<div className="card mb-sm">

<div className="section-header">

<h3 className="h2">Recent Workout Plans</h3>

<Link to="/workout-plans" className="btn secondary">Manage All Plans</Link>

</div>



{systemStats.recentPlans && systemStats.recentPlans.length > 0 ? (

<div className="plans-grid">

{systemStats.recentPlans.map(plan => (

<div key={plan.planId} className="plan-card">

<div className="plan-header">

<strong>{plan.title}</strong>

<span className="badge difficulty-badge">{plan.difficulty}</span>

</div>

<p className="small plan-description">{plan.description}</p>

<div className="plan-meta">

<span className="small u-muted">

By: {plan.createdBy?.username || 'Unknown'}

</span>

<span className="small u-muted">

{new Date(plan.creationDate).toLocaleDateString()}

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

</div>

)}

</div>



{/* Admin Actions */}

<div className="card">

<h3 className="h2">Admin Actions</h3>

<div className="admin-actions">

<Link to="/users" className="btn">Manage Users</Link>

<Link to="/workout-plans" className="btn secondary">Manage Plans</Link>

<Link to="/exercises" className="btn secondary">Exercise Database</Link>

<button className="btn secondary" onClick={loadAdminData}>

Refresh Data

</button>

</div>

</div>

</div>

);

}



export default AdminDashboard;