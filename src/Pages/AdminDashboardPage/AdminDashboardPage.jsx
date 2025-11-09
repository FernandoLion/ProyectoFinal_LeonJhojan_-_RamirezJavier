import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/config';
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc, Timestamp, addDoc } from 'firebase/firestore';

const formatFecha = (timestamp) => {
  if (!timestamp) return 'Fecha no disponible';
  return new Date(timestamp.seconds * 1000).toLocaleString('es-CO');
};
const useGetNoticias = (rol, uid) => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!rol || !uid) return;
    const noticiasRef = collection(db, "noticias");
    let q;
    if (rol === "Reportero") {
      q = query(noticiasRef, where("autorId", "==", uid));
    } else {
      q = query(noticiasRef);
    }
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listaNoticias = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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

// funcion para cambiar estado
const handleUpdateEstado = async (id, nuevoEstado) => {
  console.log(`Cambiando estado de ${id} a ${nuevoEstado}`);
  const docRef = doc(db, "noticias", id);
  try {
    await updateDoc(docRef, { estado: nuevoEstado, fechaActualizacion: Timestamp.now() });
    alert(`¡Noticia actualizada a "${nuevoEstado}"!`);
  } catch (error) {
    console.error("Error al actualizar estado: ", error);
    alert("Error al actualizar: " + error.message);
  }
};
//funcion para eliminar noticias
const handleDeleteNoticia = async (id) => {
  if (window.confirm("¿Estás seguro de que quieres eliminar esta noticia? Esta acción no se puede deshacer.")) {
    console.log(`Eliminando noticia ${id}`);
    const docRef = doc(db, "noticias", id);
    try {
      await deleteDoc(docRef);
      alert("¡Noticia eliminada!");
    } catch (error) {
      console.error("Error al eliminar: ", error);
      alert("Error al eliminar: " + error.message);
    }
  }
};


const useGetSecciones = () => {
  const [secciones, setSecciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "secciones"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listaSecciones = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSecciones(listaSecciones);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { secciones, loading };
};

// crear seccion
const handleCreateSeccion = async (e) => {
  e.preventDefault();
  const nombreSeccion = e.target.elements.nombreSeccion.value;
  if (!nombreSeccion) return;
  
  try {
    await addDoc(collection(db, "secciones"), {
      nombre: nombreSeccion
    });
    alert(`¡Sección "${nombreSeccion}" creada!`);
    e.target.reset(); 
  } catch (error) {
    console.error("Error al crear sección: ", error);
  }
};

// eliminar seccion
const handleDeleteSeccion = async (id) => {
  if (window.confirm("¿Seguro quieres eliminar esta sección?")) {
    try {
      await deleteDoc(doc(db, "secciones", id));
      alert("¡Sección eliminada!");
    } catch (error) {
      console.error("Error al eliminar sección: ", error);
    }
  }
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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {noticias.length === 0 && (
              <tr><td colSpan="4">Aún no has creado noticias.</td></tr>
            )}
            {noticias.map(noticia => (
              <tr key={noticia.id}>
                <td>{noticia.titulo}</td>
                <td>{noticia.categoria}</td>
                <td>
                  {noticia.estado === "Edición" && <span className="badge bg-info text-dark">Edición</span>}
                  {noticia.estado === "Terminado" && <span className="badge bg-warning text-dark">Terminado</span>}
                  {noticia.estado === "Publicado" && <span className="badge bg-success">Publicado</span>}
                  {noticia.estado === "Desactivado" && <span className="badge bg-danger">Desactivado</span>}
                </td>
                <td>
                  <Link to={`/admin/editar-noticia/${noticia.id}`} className="btn btn-secondary btn-sm me-2">
                    Editar
                  </Link>
                  {noticia.estado === "Edición" && (
                    <button 
                      className="btn btn-info btn-sm"
                      onClick={() => handleUpdateEstado(noticia.id, "Terminado")}
                    >
                      Terminar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// interdaz editor
const DashboardEditor = ({ uid }) => {
  const { noticias, loading: loadingNoticias } = useGetNoticias("Editor", uid);
  const { secciones, loading: loadingSecciones } = useGetSecciones(); // Hook nuevo

  const renderTablaNoticias = () => (
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
          {loadingNoticias ? (
            <tr><td colSpan="4">Cargando noticias...</td></tr>
          ) : noticias.length === 0 ? (
            <tr><td colSpan="4">No hay noticias en el sistema.</td></tr>
          ) : (
            noticias.map(noticia => (
              <tr key={noticia.id}>
                <td>{noticia.titulo}</td>
                <td>{noticia.autorNombre}</td>
                <td>
                  {noticia.estado === "Edición" && <span className="badge bg-info text-dark">Edición</span>}
                  {noticia.estado === "Terminado" && <span className="badge bg-warning text-dark">Terminado</span>}
                  {noticia.estado === "Publicado" && <span className="badge bg-success">Publicado</span>}
                  {noticia.estado === "Desactivado" && <span className="badge bg-danger">Desactivado</span>}
                </td>
                <td>
                  {(noticia.estado === "Terminado" || noticia.estado === "Desactivado") && (
                    <button className="btn btn-success btn-sm me-2" onClick={() => handleUpdateEstado(noticia.id, "Publicado")}>
                      Publicar
                    </button>
                  )}
                  {noticia.estado === "Publicado" && (
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleUpdateEstado(noticia.id, "Desactivado")}>
                      Desactivar
                    </button>
                  )}
                  <Link to={`/admin/editar-noticia/${noticia.id}`} className="btn btn-secondary btn-sm me-2">
                    Editar
                  </Link>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteNoticia(noticia.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  // vista de secciones, esto nuevo
  const renderTablaSecciones = () => (
    <div className="card-body">
      <h5>Crear Nueva Sección</h5>
      <form className="d-flex mb-4" onSubmit={handleCreateSeccion}>
        <input 
          type="text" 
          name="nombreSeccion"
          className="form-control me-2" 
          placeholder="Nombre de la nueva sección" 
          required 
        />
        <button type="submit" className="btn btn-primary">Crear</button>
      </form>
      
      <h5>Secciones Existentes</h5>
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th>Nombre de Sección</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loadingSecciones ? (
            <tr><td>Cargando secciones...</td></tr>
          ) : secciones.length === 0 ? (
            <tr><td>No hay secciones creadas.</td></tr>
          ) : (
            secciones.map(seccion => (
              <tr key={seccion.id}>
                <td>{seccion.nombre}</td>
                <td className="text-end">
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteSeccion(seccion.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="card shadow-sm">
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs" id="adminTabs" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="noticias-tab" data-bs-toggle="tab" data-bs-target="#noticias" type="button" role="tab" aria-controls="noticias" aria-selected="true">
              Gestión de Noticias
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="secciones-tab" data-bs-toggle="tab" data-bs-target="#secciones" type="button" role="tab" aria-controls="secciones" aria-selected="false">
              Gestión de Secciones (RF-08)
            </button>
          </li>
        </ul>
      </div>
      
      <div className="tab-content" id="adminTabsContent">
        <div className="tab-pane fade show active" id="noticias" role="tabpanel" aria-labelledby="noticias-tab">
          {renderTablaNoticias()}
        </div>
        <div className="tab-pane fade" id="secciones" role="tabpanel" aria-labelledby="secciones-tab">
          {renderTablaSecciones()}
        </div>
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