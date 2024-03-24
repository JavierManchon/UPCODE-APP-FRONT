
import React, { useState } from 'react'
import Catalogue from './pages/Catalogue/Catalogue'
import Header from './layout/Header/Header'
import Footer from './layout/Footer/Footer'
import Payments from './pages/Payments/Payments'
import { Navigate, Route, Routes } from "react-router-dom";
import UserArea from './pages/UserArea/UserArea'
import AsideTickets from './layout/AsideTickets/AsideTickets'

import LoginForm from './pages/Authentication/Login/LoginForm';
import RegisterForm from './pages/Authentication/Register/RegisterForm'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import ButtonComponent from './pages/Buttons/ButtonComponent'
import DivComponent from './pages/Div/DivComponent'
import FigureComponent from './pages/Figures/FigureComponent'
import FooterComponent from './pages/Footers/FooterComponent'
import FormComponent from './pages/Forms/FormComponent'
import NavComponent from './pages/Navs/NavComponent'
import SectionComponent from './pages/Sections/SectionComponent'



function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (
<div className='container-all'>
        <Header isLogged={isLogged} setIsLogged={setIsLogged} />
        <Routes>
          <Route path="/" element={<Home isLogged={isLogged} setIsLogged={setIsLogged} />} />
          <Route path="/catalogue" element={<Catalogue isLogged={isLogged} setIsLogged={setIsLogged} />} /> 
          <Route path="/user-area" element={<UserArea isLogged={isLogged} setIsLogged={setIsLogged} />} /> 
          <Route path="/payments" element={isLogged ? <Payments /> : <Navigate to="/" />} /> 
          <Route path="/login" element={<LoginForm setIsLogged={setIsLogged} />} /> 
          <Route path="/register" element={<RegisterForm />} /> 
          <Route path="/catalogue/template-buttons/:designId" element={<ButtonComponent isLogged={isLogged} setIsLogged={setIsLogged} />} /> 
          <Route path="/catalogue/template-divs/:designId" element={<DivComponent isLogged={isLogged} setIsLogged={setIsLogged} />} /> 
          <Route path="/catalogue/template-figures/:designId" element={<FigureComponent isLogged={isLogged} setIsLogged={setIsLogged} />} /> 
          <Route path="/catalogue/template-footers/:designId" element={<FooterComponent isLogged={isLogged} setIsLogged={setIsLogged} />} /> 
          <Route path="/catalogue/template-forms/:designId" element={<FormComponent isLogged={isLogged} setIsLogged={setIsLogged} />} /> 
          <Route path="/catalogue/template-navs/:designId" element={<NavComponent isLogged={isLogged} setIsLogged={setIsLogged} />} /> 
          <Route path="/catalogue/template-sections/:designId" element={<SectionComponent isLogged={isLogged} setIsLogged={setIsLogged} />} /> 
        </Routes>
        {isLogged ? <AsideTickets isLogged={isLogged} setIsLogged={setIsLogged}/> : null}
        <Footer />
      </div>
  )
}

export default App
