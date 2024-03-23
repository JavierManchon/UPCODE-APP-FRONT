
import React, { useState } from 'react'
import Catalogue from './pages/Catalogue/Catalogue'
import Header from './layout/Header/Header'
import Footer from './layout/Footer/Footer'
import Payments from './pages/Payments/Payments'
import { Route, Routes } from "react-router-dom";
import UserArea from './pages/UserArea/UserArea'
import AsideTickets from './layout/AsideTickets/AsideTickets'

import LoginForm from './pages/Authentication/Login/LoginForm';
import RegisterForm from './pages/Authentication/Register/RegisterForm'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'



function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (
      <div className='container-all'>
        <Header isLogged={isLogged} setIsLogged={setIsLogged} />
        <Routes>
          <Route path="/" element={<Home isLogged={isLogged} setIsLogged={setIsLogged} />} />
          <Route path="/catalogue" element={<Catalogue isLogged={isLogged} setIsLogged={setIsLogged} />} /> 
          <Route path="/user-area" element={<UserArea isLogged={isLogged} setIsLogged={setIsLogged} />} /> 
          <Route path="/payments" element={<Payments />} /> 
          <Route path="/login" element={<LoginForm setIsLogged={setIsLogged} />} /> 
          <Route path="/register" element={<RegisterForm />} /> 
        </Routes>
        {isLogged ? <AsideTickets isLogged={isLogged} setIsLogged={setIsLogged}/> : null}
        <Footer />
      </div>
  )
}

export default App
