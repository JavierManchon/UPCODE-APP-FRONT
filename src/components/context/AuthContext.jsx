import React, { createContext, useContext, useState } from 'react';
import { registerReq, loginReq } from '../../api/axios/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: sessionStorage.getItem('token') || null
  });

  const login = async (user) => {
    try {
      const { data } = await loginReq(user);
      const { token } = data;
      sessionStorage.setItem('token', token);
      setAuthState({ token });
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    setAuthState({ token: null });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
