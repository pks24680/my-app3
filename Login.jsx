// Login.jsx
import React, { useState } from 'react';

export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [authStatus, setAuthStatus] = useState(null); // null: no attempt, false: failed, true: successful

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: pass }),
      });

      if (response.ok) {
        setAuthStatus(true); // Authentication successful
        console.log('Authentication successful');
        // Add logic to handle successful authentication (e.g., redirect to a dashboard)
      } else {
        setAuthStatus(false); // Authentication failed
        console.log('Authentication failed');
        // Add logic to handle failed authentication (e.g., show an error message)
      }
    } catch (error) {
      setAuthStatus(false); // Authentication failed due to an error
      console.error('Error during authentication:', error);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input
          value={email}
          type="email"
          placeholder="example@example.com"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          value={pass}
          type="password"
          placeholder="*********"
          id="password"
          name="password"
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {authStatus === false && <p className="error-message">Authentication failed. Please check your credentials.</p>}
      {authStatus === true && <p className="success-message">Login successful!</p>}
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch('register')}
      >
        Don't have an account? Register and Contact Admin
      </button>
    </div>
  );
};
