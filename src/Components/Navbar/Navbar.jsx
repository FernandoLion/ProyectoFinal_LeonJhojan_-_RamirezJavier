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

    // Muestra una barra simple mientras carga el estado de auth
    if (loading) {
        return <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm" style={{ minHeight: '56px' }}></nav>;
    }

    return (
        // Navbar de Bootstrap, oscuro, expandible en 'lg'
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">
                <Link className="navbar-brand" to="/">CMS NOTICIAS</Link>
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
                            // Si el usuario está logueado
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Hola, {userData?.nombre || currentUser.email} 
                                    (<b>{userData?.rol}</b>)
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                                    <li><button className="dropdown-item" onClick={handleLogout}>Cerrar Sesión</button></li>
                                </ul>
                            </li>
                        ) : (
                            // Si el usuario NO está logueado
                            <>
                                <li className="nav-item">
                                    <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/registro">Registro</NavLink>
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