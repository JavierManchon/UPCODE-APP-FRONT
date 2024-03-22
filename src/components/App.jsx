import React, { useState } from 'react'
import Catalogue from './pages/Catalogue/Catalogue'
import Header from './layout/Header/Header'
import Footer from './layout/Footer/Footer'
import AsideTickets from './pages/AsideTickets/AsideTickets';
import ButtonComponent from './pages/Buttons/ButtonComponent';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <div>
      <Header isLogged={isLogged} setIsLogged={setIsLogged}/>
      <Catalogue/>
      <AsideTickets setIsLogged={setIsLogged} isLogged={isLogged}/>
      <Footer/>
    </div>
  )
}

export default App
