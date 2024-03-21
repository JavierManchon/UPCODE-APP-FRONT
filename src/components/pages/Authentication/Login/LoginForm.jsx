import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

const LoginForm = () => {
  const { login, logout, authState } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = { email, password };
      await login(user);
      // Aquí es donde podríamos redirigir a otra página después del inicio de sesión exitoso
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        setError(error.response.data.msg);
      } else {
        setError('Error logging in: ' + error.message);
      }
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h2>Login</h2>
      {authState.token ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
