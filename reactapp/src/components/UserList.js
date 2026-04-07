// components/UserList.js - User Management List

import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { api } from '../utils/api';

import './LandingPags.css';



function UserList() {

const [users, setUsers] = useState([]);
const [filteredUsers, setFilteredUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
const [roleFilter, setRoleFilter] = useState('');
const [searchTerm, setSearchTerm] = useState('');
const [currentPage, setCurrentPage] = useState(0);
const [totalPages, setTotalPages] = useState(0);

useEffect(() => {
    loadUsers();
}, [currentPage]);

useEffect(() => {
    filterUsers();
}, [users, roleFilter, searchTerm]);

const loadUsers = async () => {
    try {
        setLoading(true);
        const usersData = await api.getUsers(currentPage, 10);
        if (usersData && usersData.content) {
            setUsers(usersData.content);
            setTotalPages(usersData.totalPages);
        } else {
            setUsers(Array.isArray(usersData) ? usersData : []);
            setTotalPages(1);
        }
    } catch (err) {
        setError(err.message || 'Failed to fetch users');
    } finally {
        setLoading(false);
    }
};



const filterUsers = () => {

let filtered = users;



if (roleFilter) {

filtered = filtered.filter(user => user.role === roleFilter);

}



if (searchTerm) {

filtered = filtered.filter(user =>

user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||

user.email.toLowerCase().includes(searchTerm.toLowerCase())

);

}



setFilteredUsers(filtered);

};



const handleRoleFilterChange = (e) => {

setRoleFilter(e.target.value);

};



const handleSearchChange = (e) => {

setSearchTerm(e.target.value);

};



if (loading) {

return (

<div data-testid="user-list-container" className="user-list">

<div className="card">

<p>Loading users...</p>

</div>

</div>

);

}



if (error) {

return (

<div data-testid="user-list-container" className="user-list">

<div className="card">

<div className="badge user-list-error">

{error}

</div>

</div>

</div>

);

}



return (

<div data-testid="user-list-container" className="user-list">

<div className="user-list-header">

<h1 className="h1">User Management</h1>

<Link to="/users/create" className="btn">Add New User</Link>

</div>



{/* Filters */}

<div className="card user-filters">

<div className="filter-row">

<div className="filter-group">

<label htmlFor="search">Search Users</label>

<input

id="search"

type="text"

className="input"

placeholder="Search by name or email..."

value={searchTerm}

onChange={handleSearchChange}

/>

</div>

<div className="filter-group">

<label htmlFor="role-filter">Filter by Role</label>

<select

id="role-filter"

data-testid="user-role-filter"

className="input"

value={roleFilter}

onChange={handleRoleFilterChange}

>

<option value="">All Roles</option>

<option value="CLIENT">Clients</option>

<option value="TRAINER">Trainers</option>

<option value="ADMIN">Admins</option>

</select>

</div>

</div>

</div>



{/* Users List */}

<div className="card">

{filteredUsers.length === 0 ? (

<div className="empty-state">

<p>No users found</p>

{(roleFilter || searchTerm) && (

<button

className="btn secondary"

onClick={() => {

setRoleFilter('');

setSearchTerm('');

}}

>

Clear Filters

</button>

)}

</div>

) : (

<div className="users-table-container">

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

{filteredUsers.map(user => (

<tr key={user.userId}>

<td>

<div className="user-name">

<strong>{user.username}</strong>

</div>

</td>

<td>

<span className="user-email">{user.email}</span>

</td>

<td>

<span className={`badge role-${user.role.toLowerCase()}`}>

{user.role}

</span>

</td>

<td>

<span className="small u-muted">

{user.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'N/A'}

</span>

</td>

<td>

<div className="user-actions">

<Link

to={`/users/${user.userId}`}

className="btn secondary small"

>

View Details

</Link>

{user.role === 'CLIENT' && (

<Link

to={`/progress/${user.userId}`}

className="btn secondary small"

>

Progress

</Link>

)}

</div>

</td>

</tr>

))}

</tbody>

</table>

</div>

)}

</div>
<div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '10px' }}>
    <button 
        className="btn secondary" 
        disabled={currentPage === 0} 
        onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
    >
        Previous
    </button>
    <span style={{ alignSelf: 'center' }}>Page {currentPage + 1} of {Math.max(1, totalPages)}</span>
    <button 
        className="btn secondary" 
        disabled={currentPage >= totalPages - 1} 
        onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
    >
        Next
    </button>
</div>



{/* Summary Stats */}

<div className="card user-stats">

<h3 className="h2">User Statistics</h3>

<div className="stats-grid">

<div className="metric">

<span className="num">{users.length}</span>

<span className="label">Total Users</span>

</div>

<div className="metric">

<span className="num">{users.filter(u => u.role === 'CLIENT').length}</span>

<span className="label">Clients</span>

</div>

<div className="metric">

<span className="num">{users.filter(u => u.role === 'TRAINER').length}</span>

<span className="label">Trainers</span>

</div>

<div className="metric">

<span className="num">{users.filter(u => u.role === 'ADMIN').length}</span>

<span className="label">Admins</span>

</div>

</div>

</div>

</div>

);

}



export default UserList;