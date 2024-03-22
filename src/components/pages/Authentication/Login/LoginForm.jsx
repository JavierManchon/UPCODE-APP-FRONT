import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Profile from '../../Profile/Profile';

const LoginForm = () => {
  const { login, logout, authState } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // Estado para controlar si el usuario ha iniciado sesión

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = { email, password };
      await login(user);
      setLoggedIn(true); // Establecer el estado de inicio de sesión en verdadero
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
    setLoggedIn(false); // Al cerrar sesión, establecer el estado de inicio de sesión en falso
  };

  if (authState.token || loggedIn) { // Si hay un token de autenticación o el usuario ha iniciado sesión
    return (
      <div>
        <Profile />
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Login</h2>
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
      </div>
    );
  }
};

export default LoginForm;
