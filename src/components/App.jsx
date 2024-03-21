
import React, { useState } from 'react'
import Catalogue from './pages/Catalogue/Catalogue'
import Header from './layout/Header/Header'
import Footer from './layout/Footer/Footer'
import Payments from './pages/Payments/Payments'
import UserArea from './pages/UserArea/UserArea'

function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <div>
      <Header isLogged={isLogged} setIsLogged={setIsLogged}/>

      {/*<Catalogue isLogged={isLogged} setIsLogged={setIsLogged}/>*/}
      <UserArea isLogged={isLogged} setIsLogged={setIsLogged}/>
    {/*<Payments/>*/}
      <Footer/>
    </div>
  )
}

export default App
