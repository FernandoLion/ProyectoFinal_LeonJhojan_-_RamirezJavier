import { Routes, Route } from 'react-router-dom'
import RegisterPage from './Pages/RegisterPage/RegisterPage'
import LoginPage from './Pages/LoginPage/LoginPage'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import HomePage from './Pages/HomePage/HomePaje'
import NoticiaDetallePage from './Pages/NoticiaDetallePage/NoticiaDetallePage'
import AdminDashboardPage from './Pages/AdminDashboardPage/AdminDashboardPage'
import FormularioNoticiaPage from './Pages/FormularioNoticiaPage/FormularioNoticiaPage'
import RutaProtegida from './Components/RutaProtegida/RutaProtegida'


import Footer from './Components/Footer/Footer'

function App() {
  return (
    
    <div className="d-flex flex-column min-vh-100"> 
      <Navbar />
      
    
      <main className="container mt-4 flex-grow-1">
        <Routes>
         
          <Route path="/" element={<HomePage />} />
          <Route path="/noticia/:id" element={<NoticiaDetallePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />

         
          <Route
            path="/admin"
            element={
              <RutaProtegida> 
                <AdminDashboardPage />
              </RutaProtegida>
            }
          />
          <Route
            path="/admin/crear-noticia"
            element={
              <RutaProtegida> 
                <FormularioNoticiaPage />
              </RutaProtegida>
            }
          />
          <Route
            path="/admin/editar-noticia/:id"
            element={
              <RutaProtegida> 
                <FormularioNoticiaPage />
              </RutaProtegida>
            }
          />
        </Routes>
      </main>
      
      <Footer /> 
    </div>
  )
}

export default App