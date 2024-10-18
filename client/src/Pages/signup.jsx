import React, { useState } from 'react';
// import { useAuth } from '../hooks/useAuth'; // Import the useAuth hook

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const { login } = useAuth(); // Destructure login from the useAuth hook

  // Password validation rules 
  const isValidPassword = (password) => {
    return password.length >= 6; // Minimum password length of 6
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validations
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setMessage(null);
      return;
    }

    if (!isValidPassword(password)) {
      setError('Password must be at least 6 characters long');
      setMessage(null);
      return;
    }

    const userData = {
      username,
      password,
    };

    setLoading(true); // Start loading state

    try {
      const response = await fetch('http://localhost:5555/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful signup: call login with token and set messages
        login(data.token); // Use the login function from the hook
        setMessage(data.message);
        setError(null);
      } else {
        setError(data.error);  // Display error from server
        setMessage(null);
      }
    } catch (err) {
      setError('An error occurred while registering. Please try again.');
      setMessage(null);
    } finally {
      setLoading(false);  // Stop loading state
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Signup;
