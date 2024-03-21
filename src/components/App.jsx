
import React, { useState } from 'react'
import Catalogue from './pages/Catalogue/Catalogue'
import Header from './layout/Header/Header'
import Footer from './layout/Footer/Footer'
import Payments from './pages/Payments/Payments'
import { AuthProvider } from '../components/context/AuthContext';
import Login from './pages/Authentication/Login/LoginForm'

function App() {
  //const [isLogged, setIsLogged] = useState(false); COMENTADO PARA PRUEBAS DE LOGIN
  return (
    <AuthProvider>
      <div>
        <h1>My App</h1>
        <Login />
      </div>
    </AuthProvider>
  )
}

export default App
