import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { auth } from '../../firebase/config'; 
import { signOut } from 'firebase/auth';

const Navbar = () => {
    const { currentUser, userData, loading } = useAuth();

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error al cerrar sesión: ", error);
        }
    };

    if (loading) {
        // Mantenemos un placeholder mientras carga
        return <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm" style={{ minHeight: '60px' }}></nav>;
    }

    return (
       
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-5    ">
            <div className="container">
                
               
                <Link className="navbar-brand d-flex align-items-center" to="/">
                   
                    <img 
                        src="/logo.png" 
                        alt="CMS Logo" 
                        style={{ height: '30px', marginRight: '10px' }} 
                    />
                    {/* Damos un estilo más "fino" al texto */}
                    <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>CMS Noticias</span>
                </Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* Menú principal a la izquierda */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end to="/">Inicio</NavLink>
                        </li>
                        
                        {currentUser && (
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/admin">Dashboard</NavLink>
                            </li>
                        )}
                    </ul>
                    
                    {/* Menú de usuario a la derecha */}
                    <ul className="navbar-nav ms-auto">
                        {currentUser ? (
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Hola, {userData?.nombre || currentUser.email} 
                                    (<b>{userData?.rol}</b>)
                                </a>
                                
                                {/* --- 3. CAMBIO DE DROPDOWN: Quitamos 'dropdown-menu-dark' --- */}
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><button className="dropdown-item" onClick={handleLogout}>Cerrar Sesión</button></li>
                                </ul>
                            </li>
                        ) : (
                            
                            <>
                                <li className="nav-item me-2">
                                    <NavLink className="btn btn-outline-primary btn-sm" to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="btn btn-primary btn-sm" to="/registro">Registro</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;