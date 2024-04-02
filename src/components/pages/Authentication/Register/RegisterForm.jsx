import React, { useState } from 'react';
import { registerReq } from '../../../../api/axios/auth';
import { Link } from 'react-router-dom';
import '../Login/_login.scss';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
      setSuccessMessage('Se ha enviado un email de confirmación de registro a tu correo electrónico.');
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

  const handlePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='container-login'>
      <div className='div-login'>
        <h2 className='title-login'>Register</h2>
        <form className='form-login' onSubmit={handleSubmit}>
          <div>
            <input
              type="text" placeholder='Nombre' className='input-login'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text" className='input-login' placeholder='Apellidos'
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text" className='input-login' placeholder='Username'
              value={username}
              maxLength={10}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <input className='input-login' placeholder='Email'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type={showPassword ? 'text' : 'password'}
              className='input-login' placeholder='Contraseña'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span onClick={handlePassword}>{showPassword ? 'Ocultar' : 'Mostrar'} contraseña</span>
          </div>
          {error && <p className='msgerror' >{error}</p>}
          {successMessage && <p className='msgsuccess'>{successMessage}</p>}
          <button type="submit">Register</button>
        </form>
         <span className='link-register' > Si ya está registrado , pulse 👉<Link to="/login">aquí</Link>👈</span>
      </div>
    </div>
  );
};

export default RegisterForm;
