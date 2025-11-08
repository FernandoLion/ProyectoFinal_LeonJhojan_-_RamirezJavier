import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from '../../context/authContext';
const CLOUDINARY_CLOUD_NAME = "dpdieag95"; 
const CLOUDINARY_UPLOAD_PRESET = "cms-noticias";


const FormularioNoticiaPage = () => {
  const [titulo, setTitulo] = useState('');
  const [subtitulo, setSubtitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [contenido, setContenido] = useState('');
  const [imagen, setImagen] = useState(null); 
  const [loading, setLoading] = useState(false);

  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();

  const handleImagenChange = (e) => {
    if (e.target.files[0]) {
      setImagen(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser || !userData) {
      alert("Debes estar logueado para crear una noticia.");
      return;
    }
    
    setLoading(true);

    try {
      let imagenURL = "";
      if (imagen) {
        // FormData para enviar el archivo
        const formData = new FormData();
        formData.append('file', imagen);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        // Hacemos el POST request a la API de Cloudinary
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await res.json();
        
        //sacamos la url
        imagenURL = data.secure_url; 
      }

      //guardar datos en firebase
      await addDoc(collection(db, "noticias"), {
        titulo: titulo,
        subtitulo: subtitulo,
        categoria: categoria,
        contenido: contenido,
        imagenURL: imagenURL, 
        autorId: currentUser.uid, 
        autorNombre: userData.nombre,
        estado: "Edición", 
        fechaCreacion: Timestamp.now(),
        fechaActualizacion: Timestamp.now(),
      });

      alert("¡Noticia guardada! (Imagen en Cloudinary, Texto en Firebase)");
      setLoading(false);
      navigate('/admin');

    } catch (error) {
      console.error("Error al guardar la noticia: ", error);
      alert("Error al guardar: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <h2 className="text-center mb-4 mt-4">Crear Noticia</h2>
        
        <div className="card p-4 shadow">
          <form onSubmit={handleSubmit}>
            
            <div className="mb-3">
              <label htmlFor="titulo" className="form-label">Título</label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                placeholder="Título principal de la noticia"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="subtitulo" className="form-label">Subtítulo (Bajante)</label>
              <input
                type="text"
                className="form-control"
                id="subtitulo"
                placeholder="Frase corta o bajante"
                value={subtitulo}
                onChange={(e) => setSubtitulo(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="categoria" className="form-label">Categoría</label>
              <select 
                className="form-select" 
                id="categoria" 
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required>
                <option value="">Selecciona una categoría...</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Deportes">Deportes</option>
                <option value="Política">Política</option>
                <option value="Cultura">Cultura</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="imagen" className="form-label">Imagen Principal (RF-06)</label>
              <input
                type="file"
                className="form-control"
                id="imagen"
                accept="image/png, image/jpeg"
                onChange={handleImagenChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="contenido" className="form-label">Contenido</label>
              <textarea
                className="form-control"
                id="contenido"
                rows="10"
                placeholder="Escribe el cuerpo de la noticia aquí..."
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button 
                type="button" 
                className="btn btn-secondary me-md-2" 
                onClick={() => navigate('/admin')}
                disabled={loading}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar Noticia"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioNoticiaPage;