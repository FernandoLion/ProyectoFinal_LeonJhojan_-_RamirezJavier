import React, { useState, useEffect } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom'; 
import { db } from '../../firebase/config';
import { collection, addDoc, Timestamp, doc, getDoc, updateDoc } from 'firebase/firestore'; 
import { useAuth } from '../../context/authContext';
const CLOUDINARY_CLOUD_NAME = "dpdieag95"; 
const CLOUDINARY_UPLOAD_PRESET = "cms-noticias";

const FormularioNoticiaPage = () => {
  //leemmos el id de la noticia, si no hay estamos en modo crear, no editar
  const { id } = useParams();
  const [titulo, setTitulo] = useState('');
  const [subtitulo, setSubtitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [contenido, setContenido] = useState('');
  const [imagen, setImagen] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [imagenUrlExistente, setImagenUrlExistente] = useState('');//si estamos en modo editar, usamos este para gguardar la imagen ya existente
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (id) {
      // si hay id, este es el modo editar
      setLoading(true);
      const fetchNoticia = async () => {
        try {
          const docRef = doc(db, "noticias", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            // rellenamos los campos
            setTitulo(data.titulo);
            setSubtitulo(data.subtitulo);
            setCategoria(data.categoria);
            setContenido(data.contenido);
            setImagenUrlExistente(data.imagenURL); 
          } else {
            alert("Error: No se encontró la noticia para editar.");
            navigate('/admin');
          }
        } catch (error) {
          console.error("Error al cargar noticia para editar:", error);
        }
        setLoading(false);
      };
      fetchNoticia();
    }
  }, [id, navigate]); 

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
      let imagenURL = imagenUrlExistente; 

      //si se selecciono una imagen nueva, debemos subirla
      if (imagen) {
        const formData = new FormData();
        formData.append('file', imagen);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: 'POST', body: formData }
        );
        const data = await res.json();
        imagenURL = data.secure_url; 
      }

      const datosNoticia = {
        titulo: titulo,
        subtitulo: subtitulo,
        categoria: categoria,
        contenido: contenido,
        imagenURL: imagenURL, 
        fechaActualizacion: Timestamp.now(),
      };

      if (id) {
        //modo edit
        const docRef = doc(db, "noticias", id);
        await updateDoc(docRef, {
          ...datosNoticia,
          // no se modifica autor, estado, ni fecha de cracion
        });
        alert("¡Noticia actualizada!");

      } else {
        //modo create
        await addDoc(collection(db, "noticias"), {
          ...datosNoticia,
          autorId: currentUser.uid, 
          autorNombre: userData.nombre,
          estado: "Edición", 
          fechaCreacion: Timestamp.now(),
        });
        alert("¡Noticia guardada! (Imagen en Cloudinary, Texto en Firebase)");
      }
      
      setLoading(false);
      navigate('/admin');

    } catch (error) {
      console.error("Error al guardar la noticia: ", error);
      alert("Error al guardar: " + error.message);
      setLoading(false);
    }
  };

  //pal titulo dinamico xd
  const modo = id ? "Editar" : "Crear";

  if (loading && id) {
     return <div>Cargando datos para editar...</div>;
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        {/* Título dinámico */}
        <h2 className="text-center mb-4 mt-4">{modo} Noticia</h2>
        
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
              {imagenUrlExistente && !imagen && (
                <div className="mt-2">
                  <p className="form-text">Imagen actual (si no subes una nueva, se conservará esta):</p>
                  <img src={imagenUrlExistente} alt="Imagen actual" style={{ width: '100px', height: 'auto', borderRadius: '4px' }} />
                </div>
              )}
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
                {loading ? "Guardando..." : `Guardar ${modo}`}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioNoticiaPage;