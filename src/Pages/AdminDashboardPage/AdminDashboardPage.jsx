import React from 'react';
import { useAuth } from '../../context/authContext';
import { Link } from 'react-router-dom';

// componente pa la vista del usuario reportero
const DashboardReportero = () => {
  const { userData } = useAuth();
  
  //aun no hay logica para cargar noticias

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5>Mis Noticias Creadas (Vista Reportero)</h5>
        <Link to="/admin/crear-noticia" className="btn btn-primary btn-sm">
          Crear Nueva Noticia
        </Link>
      </div>
      <div className="card-body">
        <p>Hola {userData.nombre}, aquí verás las noticias que has creado.</p>
        {/* por aca va quedando la tabla del reportero */}
      </div>
    </div>
  );
};

// componente pal editor
const DashboardEditor = () => {
   
  //aun no hay logica para cargar noticias
  
  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5>Gestión de Noticias (Vista Editor)</h5>
        <Link to="/admin/crear-noticia" className="btn btn-primary btn-sm">
          Crear Nueva Noticia
        </Link>
      </div>
      <div className="card-body">
        <p>Aquí puedes ver y gestionar **TODAS** las noticias.</p>
        {/* aqui la tabla de las noticias */}
      </div>
    </div>
  );
};

const AdminDashboardPage = () => {
  const { userData } = useAuth(); 

  // se renderiza la pag, dependiendo del rol de usuairo
  const renderDashboardPorRol = () => {
    if (!userData) {
      return <div>Cargando datos del usuario...</div>;
    }

    switch (userData.rol) {
      case "Reportero":
        return <DashboardReportero />;
      case "Editor":
        return <DashboardEditor />;
      default:
        return <div className="alert alert-danger">Rol no reconocido.</div>;
    }
  };

  return (
    <div>
      <h1 className="display-5 fw-bold mt-4 mb-4">Panel de Administración</h1>
      {renderDashboardPorRol()}
    </div>
  );
};

export default AdminDashboardPage;