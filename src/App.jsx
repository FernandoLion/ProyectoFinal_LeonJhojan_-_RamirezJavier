import { Routes, Route } from 'react-router-dom'
import RegisterPage from './Pages/RegisterPage/RegisterPage'
import LoginPage from './Pages/LoginPage/LoginPage'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import HomePage from './Pages/HomePage/HomePaje'
import NoticiaDetallePage from './Pages/NoticiaDetallePage/NoticiaDetallePage'
function App() {
  return (
    <>
      <Navbar></Navbar>

      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/noticia/:id" element={<NoticiaDetallePage />} />
        </Routes>
      </main>
    </>
  )
}

export default App