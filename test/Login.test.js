import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import Jest DOM matchers
import Login from './Login';
import { login } from '../api/ImportateurService';

// Mock the login function
jest.mock('../api/ImportateurService', () => ({
  login: jest.fn(),
}));

describe('Login component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call login function with correct credentials', async () => {
    // Arrange
    const onLoginMock = jest.fn();
    const username = 'testuser';
    const password = 'testpassword';
    login.mockResolvedValueOnce({ data: { token: 'testtoken' } });

    // Act
    const { getByPlaceholderText, getByText } = render(<Login onLogin={onLoginMock} />);
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Login');

    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(login).toHaveBeenCalledTimes(1);
      expect(login).toHaveBeenCalledWith({ login: username, password });
      expect(onLoginMock).toHaveBeenCalledTimes(1);
    });
  });

  // Add more test cases as needed
});