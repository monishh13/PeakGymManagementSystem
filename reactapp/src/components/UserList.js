// components/UserList.js - User Directory

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';

function UserList() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const userRole = localStorage.getItem('userRole');

    useEffect(() => {
        loadUsers();
    }, [currentPage]);

    useEffect(() => {
        filterUsers();
    }, [users, searchTerm, roleFilter]);

    const loadUsers = async () => {
        try {
             setLoading(true);
             const data = await api.getUsers(currentPage, 10);
             if (data && data.content) {
                 setUsers(data.content);
                 setTotalPages(data.totalPages);
             } else {
                 setUsers(Array.isArray(data) ? data : []);
                 setTotalPages(1);
             }
        } catch (err) {
             setError(err.message || 'Failed to fetch directory records');
        } finally {
             setLoading(false);
        }
    };

    const filterUsers = () => {
        let filtered = users;
        if (roleFilter) {
            filtered = filtered.filter(u => u.role === roleFilter);
        }
        if (searchTerm) {
            filtered = filtered.filter(u => 
                (u.username && u.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }
        setFilteredUsers(filtered);
    };

    if (loading) return <p className="text-muted u-center mt-lg">Indexing personnel directory...</p>;
    if (error) return <div className="badge danger mb-lg">{error}</div>;

    return (
        <div data-testid="user-list-container">
             <div className="flex-space mb-md">
                 <h2 className="headline" style={{ fontSize: '2rem' }}>Directory</h2>
                 {userRole === 'ADMIN' && (
                     <Link to="/admin/users" className="btn small text-primary" style={{ background: 'var(--kv-surface-container-high)' }}>Admin Config</Link>
                 )}
             </div>

             {/* Search and Filters */}
             <div className="card flex-space mb-md" style={{ padding: '1rem' }}>
                 <input 
                     type="text" 
                     className="input" 
                     placeholder="Search operator ID or alias..." 
                     value={searchTerm}
                     onChange={e => setSearchTerm(e.target.value)}
                     style={{ width: '400px' }}
                 />
                 <select 
                     className="select" 
                     value={roleFilter} 
                     onChange={e => setRoleFilter(e.target.value)}
                 >
                     <option value="">All Ranks</option>
                     <option value="CLIENT">Client</option>
                     <option value="TRAINER">Trainer</option>
                     <option value="ADMIN">Admin</option>
                 </select>
             </div>

             <div className="card">
                 <table className="kv-table">
                     <thead>
                         <tr>
                             <th>Operator</th>
                             <th>Designation</th>
                             <th>Commenced</th>
                             <th>Access</th>
                         </tr>
                     </thead>
                     <tbody>
                         {filteredUsers.map(user => (
                             <tr key={user.userId}>
                                 <td>
                                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                         <div className="avatar" style={{ width: '36px', height: '36px' }}>
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
                                 <td>{user.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'N/A'}</td>
                                 <td>
                                     <div className="flex-gap">
                                         <Link to={`/users/${user.userId}`} className="btn secondary small">File</Link>
                                         {user.role === 'CLIENT' && (
                                             <Link to={`/progress/${user.userId}`} className="text-primary" style={{ fontSize: '0.875rem' }}>Telemetry</Link>
                                         )}
                                     </div>
                                 </td>
                             </tr>
                         ))}
                         {filteredUsers.length === 0 && (
                             <tr>
                                 <td colSpan="4" className="u-center text-muted">No personnel records found.</td>
                             </tr>
                         )}
                     </tbody>
                 </table>
             </div>

             <div className="flex-space mt-md" style={{ justifyContent: 'center', gap: '1rem' }}>
                 <button className="btn secondary small" disabled={currentPage === 0} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
                 <span className="text-muted" style={{ fontSize: '0.875rem' }}>Sector {currentPage + 1} of {Math.max(1, totalPages)}</span>
                 <button className="btn secondary small" disabled={currentPage >= totalPages - 1} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
             </div>
        </div>
    );
}

export default UserList;