import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' 
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css' 
import './index.css' 
import { AuthProvider } from './context/authContext.jsx'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
      <AuthProvider> {/*nos sirve para saber la informacion de el usuario y usarla*/}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)