// components/LoginPage.js - Authentication

import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { api } from '../utils/api';

import './LoginPage.css';



function LoginPage() {

const [credentials, setCredentials] = useState({ email: '', password: '' });

const [error, setError] = useState('');

const [loading, setLoading] = useState(false);

const navigate = useNavigate();



const handleLogin = async (e) => {

e.preventDefault();

setLoading(true);

setError('');



try {

const response = await api.login(credentials);



// Store JWT token and user info

localStorage.setItem('token', response.token);

localStorage.setItem('userRole', response.role);

localStorage.setItem('userId', response.userId);

localStorage.setItem('username', response.username);



// Redirect to dashboard

navigate('/');

} catch (err) {

setError(err.message || 'Login failed. Please check your credentials.');

} finally {

setLoading(false);

}

};



const handleInputChange = (e) => {

const { name, value } = e.target;

setCredentials(prev => ({

...prev,

[name]: value

}));

};



return (

<div className="center-page">

<div className="card login-card">

<div className="login-header">

<div className="brand-logo">

<div className="dot">P</div>

</div>

<h1 className="h1 u-center">Welcome Back</h1>

<p className="small u-center">Sign in to your PEAK Fitness account</p>

</div>



{error && (

<div className="login-error">

<span className="badge">{error}</span>

</div>

)}



<form onSubmit={handleLogin} className="login-form">

<div className="form-field">

<label htmlFor="email">Email Address</label>

<input

id="email"

name="email"

type="email"

className="input"

value={credentials.email}

onChange={handleInputChange}

required

autoComplete="email"

/>

</div>



<div className="form-field">

<label htmlFor="password">Password</label>

<input

id="password"

name="password"

type="password"

className="input"

value={credentials.password}

onChange={handleInputChange}

required

autoComplete="current-password"

/>

</div>



<button

type="submit"

className="btn login-btn"

disabled={loading}

>

{loading ? (

<>

<span className="loading-spinner"></span>

Signing in...

</>

) : (

'Sign In'

)}

</button>

</form>



<div className="login-footer">

<p className="small u-center u-muted">

Need an account? Contact your gym administrator for registration.

</p>

</div>
</div>
</div>

);

}



export default LoginPage;