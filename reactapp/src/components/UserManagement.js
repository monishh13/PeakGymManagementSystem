// components/UserManagement.js - User Management full CRUD

import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await api.getUsers(0, 50);
            setUsers(data || []);
        } catch (err) {
            console.error('Failed to load users', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = Array.isArray(users) ? users.filter(u => 
        (u.username && u.username.toLowerCase().includes(search.toLowerCase())) || 
        (u.email && u.email.toLowerCase().includes(search.toLowerCase()))
    ) : [];

    return (
        <div data-testid="user-management-container">
            <div className="flex-space mb-lg">
                <div>
                    <h2 className="headline">User Management</h2>
                    <p className="text-muted">Administer system access and roles</p>
                </div>
                <button className="btn">+ Invite User</button>
            </div>

            <div className="card mb-md flex-space">
                <input 
                    type="text" 
                    className="input" 
                    placeholder="Search users..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: '300px' }}
                />
                <div className="filters-row" style={{ paddingBottom: 0, marginBottom: 0 }}>
                    <div className="filter-pill active">All Users</div>
                    <div className="filter-pill">Admins</div>
                    <div className="filter-pill">Trainers</div>
                    <div className="filter-pill">Clients</div>
                </div>
            </div>

            <div className="card">
                {loading ? (
                    <p className="text-muted u-center">Loading users...</p>
                ) : (
                    <table className="kv-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Join Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.userId}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div className="avatar" style={{ width: '28px', height: '28px' }}>
                                                {user.username ? user.username.charAt(0).toUpperCase() : '?'}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{user.username}</div>
                                                <div className="text-muted" style={{ fontSize: '0.75rem' }}>{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge ${user.role === 'ADMIN' ? 'primary' : user.role === 'TRAINER' ? 'neutral' : 'warning'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{ color: 'var(--kv-primary)' }}>● Active</span>
                                    </td>
                                    <td>{user.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'N/A'}</td>
                                    <td>
                                        <button className="btn secondary small">Edit</button>
                                    </td>
                                </tr>
                            ))}
                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="u-center text-muted">No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default UserManagement;
