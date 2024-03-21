
import React, { useState } from 'react'
import Catalogue from './pages/Catalogue/Catalogue'
import Header from './layout/Header/Header'
import Footer from './layout/Footer/Footer'
import Payments from './pages/Payments/Payments'

function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <div>
      <Header isLogged={isLogged} setIsLogged={setIsLogged}/>
      <Catalogue/>
      <Payments/>
      <Footer/>
    </div>
  )
}

export default App
