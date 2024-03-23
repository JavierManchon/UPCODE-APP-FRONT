import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import './css/App.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './components/context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
