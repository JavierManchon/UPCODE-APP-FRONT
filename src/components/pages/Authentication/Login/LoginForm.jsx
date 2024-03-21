import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

const Login = () => {
  const { login, logout, authState } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = { email, password };
      await login(user);
      // Aqui es donde hariamos la redirección a my area o la que digamos
    } catch (error) {
      setError('Error logging in: ' + error.message);
    }
  };


  //Esta funcion logout no debe ir ene l login es solo para pruebas, se debe incorporar en el componente desde el que hagamos logout
  const handleLogout = () => {
    logout();
  };


  //Inlcuyo un condicional que renderice el boton de logout para las pruebas.
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

export default Login;
