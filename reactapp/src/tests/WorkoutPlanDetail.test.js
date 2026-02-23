import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import WorkoutPlanDetail from '../components/WorkoutPlanDetail';

// Patch the mock so getExercises is always a function, but for the error state test, it returns a Promise that never resolves to avoid triggering .then in the effect.
jest.mock('../utils/api', () => ({
  api: {
    getWorkoutPlan: jest.fn(),
    getExercises: jest.fn(),
  }
}));
const { api } = require('../utils/api');

describe('WorkoutPlanDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function setup(id) {
    return render(
      <MemoryRouter initialEntries={[`/workout-plans/${id}`]}>
        <Routes>
          <Route path="/workout-plans/:planId" element={<WorkoutPlanDetail />} />
        </Routes>
      </MemoryRouter>
    );
  }

  test('State_renders plan and exercises', async () => {
    api.getWorkoutPlan.mockResolvedValueOnce({ planId: 2, title: 'Strength', description: 'desc', difficulty: 'ADVANCED', createdBy: {username: 'alice'}, creationDate: '2023-01-01' });
    api.getExercises.mockResolvedValueOnce([
      { exerciseId: 1, name: 'Push Ups', description: 'push', sets: 2, reps: 12 },
      { exerciseId: 2, name: 'Squats', description: 'squat', sets: 3, reps: 10 },
    ]);
    setup(2);
    expect(await screen.findByText(/Strength/)).toBeInTheDocument();
    expect(await screen.findByText(/Push Ups/)).toBeInTheDocument();
    expect(screen.getByText(/Squats/)).toBeInTheDocument();
  });

  test('State_renders error and empty states', async () => {
    api.getWorkoutPlan.mockRejectedValueOnce({ error: 'Workout plan not found' });
    // For this case, getExercises should not be called; but just in case, make it never resolve.
    api.getExercises.mockImplementation(() => new Promise(() => {}));
    setup(100);
    expect(await screen.findByText(/workout plan not found/i)).toBeInTheDocument();
  });

  test('State_shows empty exercise list', async () => {
    api.getWorkoutPlan.mockResolvedValueOnce({ planId: 4, title: 'X', description: 'desc', difficulty: 'BEGINNER', createdBy: {username: 'xx'}, creationDate: '2023-01-01' });
    api.getExercises.mockResolvedValueOnce([]);
    setup(4);
    expect(await screen.findByText(/X/)).toBeInTheDocument();
    expect(await screen.findByText(/no exercises/i)).toBeInTheDocument();
  });
});
