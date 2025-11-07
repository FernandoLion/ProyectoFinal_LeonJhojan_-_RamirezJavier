import React from 'react';

const AdminDashboardPage = () => {
  
  const renderTablaNoticias = () => (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5>Gestión de Noticias</h5>
    {/* este link nos va a serrvir despues para creear noticias desde el panel admin */}
        <a href="/admin/crear-noticia" className="btn btn-primary btn-sm">
          Crear Nueva Noticia
        </a>

      </div>
      <div className="card-body">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
                {/* aqui van los atributos de las noticias */}
              <th>Título</th>
              <th>Categoría</th>
              <th>Autor</th>
              <th>Estado (RF-07)</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/*aqui vamos a agregar nuestras noticias */}
          </tbody>
        </table>
      </div>
    </div>
  );

  
  const renderTablaSecciones = () => (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5>Gestión de Secciones</h5>
        <button className="btn btn-primary btn-sm">
          Crear Nueva Sección
        </button>
      </div>
      <div className="card-body">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Nombre de Sección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tecnología</td>
              <td>
                <button className="btn btn-secondary btn-sm me-2">Editar</button>
                <button className="btn btn-danger btn-sm">Eliminar</button>
              </td>
            </tr>
            <tr>
              <td>Deportes</td>
              <td>
                <button className="btn btn-secondary btn-sm me-2">Editar</button>
                <button className="btn btn-danger btn-sm">Eliminar</button>
              </td>
            </tr>
             <tr>
              <td>Política</td>
              <td>
                <button className="btn btn-secondary btn-sm me-2">Editar</button>
                <button className="btn btn-danger btn-sm">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="display-5 fw-bold mt-4 mb-4">Panel de Administración</h1>
      
      {/* son las pestañas de navegacion*/}
      <ul className="nav nav-tabs mb-3" id="adminTabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="noticias-tab" data-bs-toggle="tab" data-bs-target="#noticias" type="button" role="tab" aria-controls="noticias" aria-selected="true">
            Noticias
          </button>
        </li>
      </ul>
      
      {/* aqui va el div de las noticias*/}
      <div className="tab-content" id="adminTabsContent">
        <div className="tab-pane fade show active" id="noticias" role="tabpanel" aria-labelledby="noticias-tab">
          {renderTablaNoticias()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;