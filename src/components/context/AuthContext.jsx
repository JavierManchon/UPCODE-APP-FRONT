import React, { createContext, useContext, useState, useEffect } from 'react';
import { registerReq, loginReq, userByTokenReq, patchUserReq, getAllUsersReq } from '../../api/axios/auth';
import { API } from '../../api/axios/axios';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: sessionStorage.getItem('token') ||  null,
    user: JSON.parse(sessionStorage.getItem('user')) || null
  });
  const [usersState, setUsersState] = useState([]);

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
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(data));
      setAuthState({ token: token, user: data });
      API.defaults.headers.common['Authorization'] = token;
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  const logout = () => {
    sessionStorage.clear();
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

  const getAllUsers = async () => {
    try {
      const response = await getAllUsersReq();
      const users = response.data;
      setUsersState(users);
      return users;
    } catch (error) {
      console.error('Error fetching all users:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ authState, usersState, register, login, logout, patchUser, getAllUsers }}>
      {children}
    </AuthContext.Provider>
  );
};
