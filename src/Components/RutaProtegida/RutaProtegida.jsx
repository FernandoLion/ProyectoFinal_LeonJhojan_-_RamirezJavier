import React from 'react';
import { useAuth } from '../../context/authContext';
import { Navigate } from 'react-router-dom';

const RutaProtegida = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>; // O un spinner
  }

  // Si NO hay usuario, lo redirigimos a /login 
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Si SÍ hay usuario, lo dejamos pasar
  return children;
};

export default RutaProtegida;