import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { db } from '../../firebase/config';   
import { doc, getDoc } from 'firebase/firestore'; 

// pa formato de fecha pa
const formatFecha = (timestamp) => {
  if (!timestamp) return 'Fecha no disponible';
  return new Date(timestamp.seconds * 1000).toLocaleString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const NoticiaDetallePage = () => {
  const { id } = useParams(); //sacamos el id de la noti
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoticia = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "noticias", id);
        const docSnap = await getDoc(docRef); //Pedimos el doc a firebase

        if (docSnap.exists()) {
          setNoticia(docSnap.data());
        } else {
          console.log("¡No se encontró esa noticia!");
          setNoticia(null); // proximamente redirigimos a pagina no existente
        }
      } catch (error) {
        console.error("Error al cargar la noticia:", error);
      }
      setLoading(false);
    };

    fetchNoticia();
  }, [id]); 


  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!noticia) {
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        <h2>Error 404</h2>
        <p>La noticia que buscas no existe.</p>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        
        <h5 className="text-primary mt-4">{noticia.categoria}</h5>
        
        <h1 className="display-4 fw-bold mt-2">{noticia.titulo}</h1>
        
        <p className="lead mt-3">{noticia.subtitulo}</p>
        
        <div className="text-muted mb-3">
          Por <strong>{noticia.autorNombre}</strong> | Publicado: {formatFecha(noticia.fechaCreacion)}
        </div>
        
        {/* sacamos la imagen de la Cloudinary*/}
        {noticia.imagenURL && (
          <img 
            src={noticia.imagenURL} 
            className="img-fluid rounded mb-4" 
            alt={noticia.titulo} 
          />
        )}
        
        <div 
          className="mt-4 fs-5" 
          dangerouslySetInnerHTML={{ __html: noticia.contenido }} 
        />
        
      </div>
    </div>
  );
};

export default NoticiaDetallePage;