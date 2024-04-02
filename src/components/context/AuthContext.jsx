import { createContext, useContext, useState, useEffect } from 'react';
import { registerReq, loginReq, patchUserReq, getAllUsersReq } from '../../api/axios/auth';
import { API } from '../../api/axios/axios';
import { useNavigate } from 'react-router-dom';

//creamos contexto de usuario cada vez que hace login
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
//esto lo utilizamos para poder pasar la informacion de autenticacion a cualquier componente hijo que necesite los datos del usuario
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(!!sessionStorage.getItem('token'));

  const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem('isAdmin') === 'true');
// los datos que manejamos son que el usuario este logado , sea admin y luego su información del objeto user
  const [authState, setAuthState] = useState({
    token: sessionStorage.getItem('token') ||  null,
    user: JSON.parse(sessionStorage.getItem('user')) || null,
    isAdmin:sessionStorage.getItem('isAdmin') || null
  });
  const [usersState, setUsersState] = useState([]);
//carga la informacion del usuario en base al token
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
      const { token, isAdmin } = data;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(data));
      sessionStorage.setItem('isAdmin', isAdmin);
      //console.log(sessionStorage.getItem('isAdmin'));
      setAuthState({ token: token, user: data });
      setIsAdmin(isAdmin || false);
      API.defaults.headers.common['Authorization'] = token;
      setIsLogged(true);
      if (isAdmin) {
        navigate('/admins');
      } else {
        navigate('/user-area');
      }
    } catch (error) {
      throw new Error(error.response && error.response.data && error.response.data.msg ? error.response.data.msg : 'Error al intentar iniciar sesión. Por favor, intenta nuevamente.');
    }
  };

  const logout = async () => {
    try {
        // await logoutReq(); // Hacer la solicitud para cerrar sesión en el servidor
        setAuthState({ token: null, user: null });
        setIsLogged(false);
        navigate('/');
    } catch (error) {
        console.error('Error logging out:', error);
    }
  };

  const patchUser = async (id, userData) => {
    try {
      const response = await patchUserReq(id, userData);
      setAuthState(prevState => ({
        ...prevState,
        user: response.data,
      }));
      //console.log(id , userData)
      sessionStorage.setItem('user', JSON.stringify(response.data));
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
    <AuthContext.Provider value={{ authState, setAuthState, usersState, register, login, logout, patchUser, getAllUsers, isLogged ,isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
