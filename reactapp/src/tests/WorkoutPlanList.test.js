import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import WorkoutPlanList from '../components/WorkoutPlanList';

jest.mock('../utils/api', () => ({
  api: {
    getWorkoutPlans: jest.fn()
  }
}));
const { api } = require('../utils/api');

describe('WorkoutPlanList component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('State_renders plans and filter', async () => {
    api.getWorkoutPlans.mockResolvedValueOnce([
      { planId: 1, title: 'Strength', description: 'Build muscle', difficulty: 'BEGINNER', createdBy: {username: 'tr1'}, creationDate: '2024-07-01' },
      { planId: 2, title: 'Endurance', description: 'Improve endurance', difficulty: 'ADVANCED', createdBy: {username: 'tr2'}, creationDate: '2024-06-01' }
    ]);
    render(<WorkoutPlanList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
    expect(screen.getByText('Strength')).toBeInTheDocument();
    expect(screen.getByText('Endurance')).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('plan-diff-filter'), { target: { value: 'BEGINNER' } });
    expect(screen.getByText('Strength')).toBeInTheDocument();
    expect(screen.queryByText('Endurance')).toBeNull();
  });

  test('State_displays error and empty', async () => {
    api.getWorkoutPlans.mockRejectedValueOnce({ error: 'Failed to fetch plans!' });
    render(<WorkoutPlanList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
    expect(screen.getByText(/failed to fetch plans/i)).toBeInTheDocument();
  });
  
  test('State_shows empty if no plans', async () => {
    api.getWorkoutPlans.mockResolvedValueOnce([]);
    render(<WorkoutPlanList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await screen.findByText(/no workout plans found/i);
  });
});