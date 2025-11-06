import { Routes, Route } from 'react-router-dom'
import RegisterPage from './Pages/RegisterPage/RegisterPage'
import LoginPage from './Pages/LoginPage/LoginPage'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
function App() {
  return (
    <>
      <Navbar></Navbar>

      <main className="container mt-4">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          
        </Routes>
      </main>
    </>
  )
}

export default App