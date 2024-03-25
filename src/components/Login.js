import React, { useState } from 'react';
import { login, register } from '../api/ImportateurService';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // State to track if user is registering

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isRegistering) {
        // If registering, call the register API
        const response = await register({
          firstName: username, // Assuming username is for first name
          lastName: '', // Assuming no last name for registration
          login: username,
          password: password
        });
        localStorage.setItem('token', response.data.token);
        // After successful registration, bring back to login
        setIsRegistering(false);
      } else {
        // If logging in, call the login API
        const response = await login({ login: username, password });
        localStorage.setItem('token', response.data.token);
        onLogin();
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      {/* Toggle between login and register */}
      {!isRegistering && (
        <p onClick={() => setIsRegistering(true)}>
          Don't have an account? Register here
        </p>
      )}
    </div>
  );  
}

export default Login;


