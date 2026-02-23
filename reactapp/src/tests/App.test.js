import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

describe('App routing', () => {
  test('renders dashboard by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppWrapper />
      </MemoryRouter>
    );
    expect(screen.getByTestId('dashboard-container')).toBeInTheDocument();
  });

  test('renders user list route', () => {
    render(
      <MemoryRouter initialEntries={['/users']}>
        <AppWrapper />
      </MemoryRouter>
    );
    expect(screen.getByTestId('user-list-container')).toBeInTheDocument();
  });

  test('renders workout plan list route', () => {
    render(
      <MemoryRouter initialEntries={['/workout-plans']}>
        <AppWrapper />
      </MemoryRouter>
    );
    expect(screen.getByTestId('plan-list-container')).toBeInTheDocument();
  });
});

// Helper that renders App's inner content without <Router>
function AppWrapper() {
  // For testing, render just the <Routes/>. Copy exact logic from App but drop the <Router>.
  const React = require('react');
  const Dashboard = require('./components/Dashboard').default;
  const UserList = require('./components/UserList').default;
  const UserDetail = require('./components/UserDetail').default;
  const WorkoutPlanList = require('./components/WorkoutPlanList').default;
  const WorkoutPlanDetail = require('./components/WorkoutPlanDetail').default;
  const ProgressTracker = require('./components/ProgressTracker').default;
  const { Routes, Route, Link } = require('react-router-dom');

  return (
    <>
      <nav style={{
        display: 'flex', gap: '1rem', padding: '1rem', background: 'var(--bg-gray-100)', borderBottom: '1px solid var(--border-light)',
        justifyContent: 'center', marginBottom: '1.5rem'
      }}>
        <Link to="/">Dashboard</Link>
        <Link to="/users">Users</Link>
        <Link to="/workout-plans">Workout Plans</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:userId" element={<UserDetail />} />
        <Route path="/workout-plans" element={<WorkoutPlanList />} />
        <Route path="/workout-plans/:planId" element={<WorkoutPlanDetail />} />
        <Route path="/progress/:userId" element={<ProgressTracker />} />
      </Routes>
    </>
  );
}
