
import React, { useState } from 'react'
import Catalogue from './pages/Catalogue/Catalogue'
import Header from './layout/Header/Header'
import Footer from './layout/Footer/Footer'
import Payments from './pages/Payments/Payments'

import UserArea from './pages/UserArea/UserArea'
import AsideTickets from './layout/AsideTickets/AsideTickets'

import { AuthProvider } from '../components/context/AuthContext';
import LoginForm from './pages/Authentication/Login/LoginForm';
import RegisterForm from './pages/Authentication/Register/RegisterForm'
import Profile from './pages/Profile/Profile'


function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (

    <div>
      <Header isLogged={isLogged} setIsLogged={setIsLogged}/>
      {/*<AsideTickets isLogged={isLogged} setIsLogged={setIsLogged}/>*/}
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      {/*<Catalogue isLogged={isLogged} setIsLogged={setIsLogged}/>*/}
      {/* <UserArea isLogged={isLogged} setIsLogged={setIsLogged}/> */}
      {/*<Payments/>*/}
      <Footer/>
    </div>

  )
}

export default App
