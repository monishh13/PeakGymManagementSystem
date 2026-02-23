        // components/UserDetail.js - User Detail View

        import React, { useState, useEffect } from 'react';

        import { useParams, Link } from 'react-router-dom';

        import { api } from '../utils/api';

        import './LandingPags.css';;



        function UserDetail() {

        const { userId } = useParams();

        const [user, setUser] = useState(null);

        const [progress, setProgress] = useState([]);

        const [loading, setLoading] = useState(true);

        const [error, setError] = useState('');



        useEffect(() => {

        if (userId) {

        loadUserDetail();

        }

        }, [userId]);



        const loadUserDetail = async () => {

        try {

        const userData = await api.getUser(userId);

        setUser(userData);



        // Only load progress for clients

        if (userData.role === 'CLIENT' || userData.role === 'MEMBER') {

        try {

        const progressData = await api.getUserProgress(userId);

        setProgress(progressData);

        } catch (progressError) {

        // Progress might not be available for all clients

        setProgress([]);

        }

        }

        } catch (err) {

        setError(err.message || 'User does not exist');

        } finally {

        setLoading(false);

        }

        };



        if (loading) {

        return (

        <div className="user-detail">

        <div className="card">

        <p>Loading user details...</p>

        </div>

        </div>

        );

        }



        if (error) {

        return (

        <div className="user-detail">

        <div className="card">

        <div className="badge user-error">

        {error}

        </div>

        <Link to="/users" className="btn secondary mt-sm">

        Back to Users

        </Link>

        </div>

        </div>

        );

        }



        if (!user) {

        return (

        <div className="user-detail">

        <div className="card">

        <p>User not found</p>

        <Link to="/users" className="btn secondary">

        Back to Users

        </Link>

        </div>

        </div>

        );

        }



        const isClient = user.role === 'CLIENT' || user.role === 'MEMBER';



        return (

        <div className="user-detail">

        <div className="user-header">

        <Link to="/users" className="btn secondary">← Back to Users</Link>

        <h1 className="h1">User Details</h1>

        </div>



        {/* User Information */}

        <div className="card user-info-card">

        <div className="user-info-header">

        <div className="user-avatar">

        <span>{user.username.charAt(0).toUpperCase()}</span>

        </div>

        <div className="user-basic-info">

        <h2 className="h2">{user.username}</h2>

        <p className="user-email">{user.email}</p>

        <span className={`badge role-${user.role.toLowerCase()}`}>

        {user.role}

        </span>

        </div>

        </div>



        <div className="user-details-grid">

        <div className="detail-item">

        <span className="label">User ID</span>

        <span className="value">{user.userId}</span>

        </div>

        <div className="detail-item">

        <span className="label">Join Date</span>

        <span className="value">

        {user.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'N/A'}

        </span>

        </div>

        <div className="detail-item">

        <span className="label">Status</span>

        <span className="value">

        <span className="badge status-active">Active</span>

        </span>

        </div>

        </div>

        </div>



        {/* Progress Section (only for clients) */}

        {isClient && (

        <div className="card progress-card">

        <div className="section-header">

        <h3 className="h2">Assigned Workout Plans</h3>

        <Link

        to={`/progress/${userId}`}

        className="btn secondary"

        >

        View Full Progress

        </Link>

        </div>



        {progress.length > 0 ? (

        <div className="progress-list">

        {progress.map((progressItem, index) => (

        <div key={progressItem.progressId || index} className="progress-item">

        <div className="progress-header">

        <div className="plan-info">

        <strong>{progressItem.workoutPlan?.title || 'Workout Plan'}</strong>

        <span className="badge difficulty-badge">

        {progressItem.workoutPlan?.difficulty || 'Unknown'}

        </span>

        </div>

        <div className="progress-percentage">

        <span className="progress-value">{progressItem.completionPercentage}%</span>

        </div>

        </div>



        <div className="progress-bar-container">

        <div

        className="progress-bar"

        style={{ width: `${progressItem.completionPercentage}%` }}

        ></div>

        </div>



        <div className="progress-meta">

        <span className="small u-muted">

        Last Updated: {progressItem.lastUpdated ?
        new Date(progressItem.lastUpdated).toLocaleDateString() : 'Never'}

        </span>

        {progressItem.assignedDate && (

        <span className="small u-muted">

        Assigned: {new Date(progressItem.assignedDate).toLocaleDateString()}

        </span>

        )}

        </div>

        </div>

        ))}

        </div>

        ) : (

        <div className="empty-state">

        <p>No assigned plans found for this client.</p>

        </div>

        )}

        </div>

        )}



        {/* Actions */}

        <div className="card user-actions">

        <h3 className="h2">Actions</h3>

        <div className="action-buttons">

        <Link to={`/users/${userId}/edit`} className="btn secondary">

        Edit User

        </Link>

        {isClient && (

        <Link to={`/progress/${userId}`} className="btn secondary">

        View Progress

        </Link>

        )}

        <button className="btn secondary" onClick={loadUserDetail}>

        Refresh Data

        </button>

        </div>

        </div>

        </div>

        );

        }



        export default UserDetail;