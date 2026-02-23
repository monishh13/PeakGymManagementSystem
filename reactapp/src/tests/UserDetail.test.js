import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UserDetail from '../components/UserDetail';

jest.mock('../utils/api', () => ({
  api: {
    getUser: jest.fn(),
    getUserProgress: jest.fn(),
  }
}));
const { api } = require('../utils/api');

describe('UserDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function setup(id) {
    return render(
      <MemoryRouter initialEntries={[`/users/${id}`]}>
        <Routes>
          <Route path="/users/:userId" element={<UserDetail />} />
        </Routes>
      </MemoryRouter>
    );
  }

  test('State_renders member details and progress', async () => {
    api.getUser.mockResolvedValueOnce({ userId: 2, username: 'bob', email: 'bob@mail.com', role: 'MEMBER', joinDate: '2023-01-01' });
    api.getUserProgress.mockResolvedValueOnce([
      { progressId: 5, workoutPlan: { title: 'Strength', difficulty: 'ADVANCED' }, completionPercentage: 42, lastUpdated: '2024-07-03', assignedDate: '2024-06-23' }
    ]);
    setup(2);
    expect(await screen.findByText(/bob@mail.com/)).toBeInTheDocument();
    // Use all matcher to handle possible multiple .textContent with 'Strength'
    const planNodes = await screen.findAllByText((c, el) => el.textContent.includes('Strength'));
    expect(planNodes.length).toBeGreaterThan(0);
    expect(screen.getByText(/42%/)).toBeInTheDocument();
  });

  test('State_renders trainer details and does not show progress', async () => {
    api.getUser.mockResolvedValueOnce({ userId: 1, username: 'alice', email: 'alice@mail.com', role: 'TRAINER', joinDate: '2024-01-01' });
    setup(1);
    expect(await screen.findByText(/alice@mail.com/)).toBeInTheDocument();
    expect(screen.queryByText(/assigned workout plans/i)).toBeNull();
  });

  test('ErrorHandling_renders error and empty state', async () => {
    api.getUser.mockRejectedValueOnce({ error: 'User does not exist' });
    setup(100);
    expect(await screen.findByText(/user does not exist/i)).toBeInTheDocument();
  });

  test('State_shows No assigned plans if no progress', async () => {
    api.getUser.mockResolvedValueOnce({ userId: 3, username: 'mem', email: 'mem@x.com', role: 'MEMBER', joinDate: '2022-02-02' });
    api.getUserProgress.mockResolvedValueOnce([]);
    setup(3);
    expect(await screen.findByText('mem@x.com')).toBeInTheDocument();
    await screen.findByText(/no assigned plans/i);
  });
});
