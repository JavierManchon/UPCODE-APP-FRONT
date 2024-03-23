import React, { useState } from 'react';
import { registerReq } from '../../../../api/axios/auth';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validación de campos
      if (!name || !surname || !email || !username || !password) {
        setError('¡No puedes dejar campos vacíos!');
        return;
      }

      // Validación de la contraseña
      if (password.length < 8) {
        setError('¡La contraseña es demasiado corta! Debe tener al menos 8 caracteres.');
        return;
      }
      const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,12}$/;
      if (!regexp.test(password)) {
        setError('¡La contraseña no cumple con los requisitos mínimos de seguridad! Debe tener de 8 a 12 caracteres, al menos una letra mayúscula, una letra minúscula, y un número.');
        return;
      }

      // Registro del usuario
      const user = { name, surname, email, username, password };
      await registerReq(user);
      
      // Mensaje de éxito y limpieza de campos
      setSuccessMessage('Se ha enviado un mensaje de confirmación de registro a tu correo electrónico.');
      setName('');
      setSurname('');
      setEmail('');
      setUsername('');
      setPassword('');
      setError('');
    } catch (error) {
      setError('Error registering: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Surname:</label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <button type="submit">Register</button>
      </form>
      <li><Link to="/login">Login</Link></li>
    </div>
  );
};

export default RegisterForm;
