import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import UserList from '../components/UserList';

jest.mock('../utils/api', () => ({
  api: {
    getUsers: jest.fn()
  }
}));
const { api } = require('../utils/api');

describe('UserList component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('State_displays loading and users, filter works', async () => {
    api.getUsers.mockResolvedValueOnce([
      { userId: 1, username: 'alice', email: 'a@b.com', role: 'TRAINER', joinDate: '2024-05-20' },
      { userId: 2, username: 'bob', email: 'bob@mail.com', role: 'MEMBER', joinDate: '2023-04-21' },
    ]);
    render(<UserList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
    expect(screen.getByText('alice')).toBeInTheDocument();
    expect(screen.getByText('bob')).toBeInTheDocument();
    // Filter
    fireEvent.change(screen.getByTestId('user-role-filter'), { target: { value: 'TRAINER' } });
    expect(screen.getByText('alice')).toBeInTheDocument();
    expect(screen.queryByText('bob')).toBeNull();
  });

  test('ErrorHandling_displays error and empty state', async () => {
    api.getUsers.mockRejectedValueOnce({ error: 'Failed to fetch!' });
    render(<UserList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
    expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
  });
  
  test('State_shows empty state if no users', async () => {
    api.getUsers.mockResolvedValueOnce([]);
    render(<UserList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await screen.findByText(/no users found/i);
  });
});
