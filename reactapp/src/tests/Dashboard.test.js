import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../components/Dashboard';

describe('Dashboard', () => {
  test('State_renders the dashboard welcome', () => {
    render(<Dashboard />);
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-container')).toBeInTheDocument();
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });
});