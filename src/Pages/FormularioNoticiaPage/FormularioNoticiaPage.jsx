import React from 'react';

const FormularioNoticiaPage = () => {

  //esta variable despues nos va a ayudar a saber si vamos a editar o vamos a crear
  //por ahora solo esta en crear porque no contamos con conexion a firebase
  const modo = "Crear"; 

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <h2 className="text-center mb-4 mt-4">{modo} Noticia</h2>
        
        <div className="card p-4 shadow">
          <form>
            
            {/*el titulo */}
            <div className="mb-3">
              <label htmlFor="titulo" className="form-label">Título</label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                placeholder="Título principal de la noticia"
                required
              />
            </div>

            {/* el subtitulo*/}
            <div className="mb-3">
              <label htmlFor="subtitulo" className="form-label">Subtítulo (Bajante)</label>
              <input
                type="text"
                className="form-control"
                id="subtitulo"
                placeholder="Frase corta o bajante"
                required
              />
            </div>

            {/* para las categorias */}
            <div className="mb-3">
              <label htmlFor="categoria" className="form-label">Categoría</label>
              <select className="form-select" id="categoria" required>
                <option value="">Selecciona una categoría...</option>
                <option value="tecnologia">Tecnología</option>
                <option value="deportes">Deportes</option>
                <option value="politica">Política</option>
              </select>
            </div>

            {/* campo para la imagen*/}
            <div className="mb-3">
              <label htmlFor="imagen" className="form-label">Imagen Principal (RF-06)</label>
              <input
                type="file"
                className="form-control"
                id="imagen"
                accept="image/png, image/jpeg" 
              />
            </div>

            {/* para el contenido */}
            <div className="mb-3">
              <label htmlFor="contenido" className="form-label">Contenido</label>
              <textarea
                className="form-control"
                id="contenido"
                rows="10"
                placeholder="Escribe el cuerpo de la noticia aquí..."
                required
              ></textarea>
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <a href="/admin" className="btn btn-secondary me-md-2">
                Cancelar
              </a>
              <button type="submit" className="btn btn-primary">
                Guardar Noticia
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioNoticiaPage;