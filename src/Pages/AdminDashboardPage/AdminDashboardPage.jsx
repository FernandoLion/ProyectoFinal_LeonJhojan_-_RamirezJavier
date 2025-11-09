import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const formatFecha = (timestamp) => {
  if (!timestamp) return 'Fecha no disponible';
  return new Date(timestamp.seconds * 1000).toLocaleString('es-CO');
};

//codigo pa leer noticiasa
const useGetNoticias = (rol, uid) => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!rol || !uid) return; // no se hace nada si no hay usuario

    const noticiasRef = collection(db, "noticias");
    let q; // la query

    if (rol === "Reportero") {
      // si es reportero, trae las noticias q creo
      q = query(noticiasRef, where("autorId", "==", uid));
    } else {
      //si editor o otro pues trae todo pa
      q = query(noticiasRef);
    }

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listaNoticias = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNoticias(listaNoticias);
      setLoading(false);
    }, (error) => {
      console.error("Error al leer noticias: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [rol, uid]);

  return { noticias, loading };
};


const DashboardReportero = ({ uid }) => {
  const { noticias, loading } = useGetNoticias("Reportero", uid);

  if (loading) return <div>Cargando mis noticias...</div>;

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5>Mis Noticias Creadas (Vista Reportero)</h5>
        <Link to="/admin/crear-noticia" className="btn btn-primary btn-sm">
          Crear Nueva Noticia
        </Link>
      </div>
      <div className="card-body">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Título</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Actualizado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {noticias.length === 0 && (
              <tr><td colSpan="5">Aún no has creado noticias.</td></tr>
            )}
            {noticias.map(noticia => (
              <tr key={noticia.id}>
                <td>{noticia.titulo}</td>
                <td>{noticia.categoria}</td>
                <td><span className="badge bg-info text-dark">{noticia.estado}</span></td>
                <td>{formatFecha(noticia.fechaActualizacion)}</td>
                <td>
                  <Link to={`/admin/editar-noticia/${noticia.id}`} className="btn btn-secondary btn-sm me-2">Editar</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DashboardEditor = ({ uid }) => {
  const { noticias, loading } = useGetNoticias("Editor", uid);

  if (loading) return <div>Cargando todas las noticias...</div>;

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5>Gestión de Noticias (Vista Editor)</h5>
        <Link to="/admin/crear-noticia" className="btn btn-primary btn-sm">
          Crear Nueva Noticia
        </Link>
      </div>
      <div className="card-body">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Estado</th>
              <th>Acciones (Editor)</th>
            </tr>
          </thead>
          <tbody>
            {noticias.length === 0 && (
              <tr><td colSpan="4">No hay noticias en el sistema.</td></tr>
            )}
            {noticias.map(noticia => (
              <tr key={noticia.id}>
                <td>{noticia.titulo}</td>
                <td>{noticia.autorNombre}</td>
                <td>
                  {/* colores pa los estados*/}
                  {noticia.estado === "Edición" && <span className="badge bg-info text-dark">Edición</span>}
                  {noticia.estado === "Terminado" && <span className="badge bg-warning text-dark">Terminado</span>}
                  {noticia.estado === "Publicado" && <span className="badge bg-success">Publicado</span>}
                  {noticia.estado === "Desactivado" && <span className="badge bg-danger">Desactivado</span>}
                </td>
                <td>
                  {/* gestioanr estados, sin logica aun*/}
                  <button className="btn btn-success btn-sm me-2">Publicar</button>
                  <button className="btn btn-warning btn-sm me-2">Desactivar</button>
                  <Link to={`/admin/editar-noticia/${noticia.id}`} className="btn btn-secondary btn-sm">Editar</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminDashboardPage = () => {
  const { userData, currentUser } = useAuth();

  const renderDashboardPorRol = () => {
    if (!userData || !currentUser) {
      return <div>Cargando datos del usuario...</div>;
    }

    switch (userData.rol) {
      case "Reportero":
        return <DashboardReportero uid={currentUser.uid} />;
      case "Editor":
        return <DashboardEditor uid={currentUser.uid} />;
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