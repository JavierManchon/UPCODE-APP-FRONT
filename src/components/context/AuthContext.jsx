import React, { createContext, useContext, useState, useEffect } from 'react';
import { registerReq, loginReq, userByTokenReq, patchUserReq } from '../../api/axios/auth';
import { API } from '../../api/axios/axios';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: sessionStorage.getItem('token') || null,
    user: null
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // if (!authState.user && authState.token) {
        //   const response = await userByTokenReq();
        //   setAuthState(prevState => ({
        //     ...prevState,
        //     user: response.data
        //   }));
        // }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
  
    fetchUserInfo();
  }, [authState.token, authState.user]);
  

  const register = async (user) => {
    try {
      const { data } = await registerReq(user);
      const { token } = data;
      sessionStorage.setItem('token', token);
      setAuthState({ token, user: null });
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  const login = async (user) => {
    try {
      const { data } = await loginReq(user);
      const { token } = data;
      setAuthState({ token: token, user: data });
      sessionStorage.setItem('token', token);
      API.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
      console.log(token)
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    setAuthState({ token: null, user: null });
  };

  const patchUser = async (id, userData) => {
    try {
      const response = await patchUserReq(id, userData);
      setAuthState(prevState => ({
        ...prevState,
        user: response.data
      }));
      console.log(id , userData)
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ authState, register, login, logout, patchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
