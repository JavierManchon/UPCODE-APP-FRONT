import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Link } from "react-router-dom";
import './_login.scss';


const LoginForm = ({ setIsLogged }) => {
  const { login, authState } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,12}$/;

    return regexp.test(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('')
    setEmailError('')
    setPasswordError('')

    if (!validateEmail(email)) {
      setEmailError('Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('La contraseña no cumple con los requisitos mínimos de seguridad: debe tener de 8 a 12 caracteres, al menos una letra mayúscula, una letra minúscula y un número.');
      return;
    }

    try {
      const user = { email, password };
      await login(user);
      // habilitar cuando este hecho el componente admins
      // if(authState.user.isAdmin) {
      //   navigate('/admins')
      // } else {
      //   navigate('/catalogue')
      // }
      
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='container-login'>
      <div className='div-login'>

        <h2 className='title-login'>Login</h2>
        <form className='form-login' onSubmit={handleLogin}>
          <div>
            <input type="email" className='input-login' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            {emailError && <p className='msgmailerror'>{emailError}</p>}
          </div>
          <div>
            <input className='input-login' type={showPassword ? 'text' : 'password'} placeholder='Contraseña' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <span onClick={handlePassword}>{showPassword ? 'Ocultar' : 'Mostrar'} contraseña</span>
            {passwordError && <p className='msgpasserror'>{passwordError}</p>}
          </div>
          {error && <p className='msgerror'>{error}</p>}
          <button type="submit">Login</button>
        </form>
        <span className='linki-register'>¿Aún no estás registrado? 👉<Link className='link-register' to="/register">¡Pincha aquí!</Link>
              <span>👈</span></span>

      </div>
    </div>
  );
};

export default LoginForm;
