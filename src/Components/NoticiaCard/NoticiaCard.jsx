import React from 'react';
import { Link } from 'react-router-dom';

const NoticiaCard = ({ noticia }) => {
    
    const { id, titulo = "Título no disponible", subtitulo = "", imagenURL, categoria = "General" } = noticia;
    //cambios para leer la imagen, sino usamos place holder
    const imageUrl = imagenURL || `https://via.placeholder.com/300x200?text=${categoria}`;

    return (
        <div className="col"> 
            <div className="card h-100 shadow-sm">
                
                <img 
                  src={imageUrl} 
                  className="card-img-top" 
                  alt={titulo} 
                  style={{ height: '200px', objectFit: 'cover' }} 
                />
                
                <div className="card-body d-flex flex-column">
                    <span className="badge bg-primary mb-2 align-self-start">{categoria}</span>
                    <h5 className="card-title">{titulo}</h5>
                    <p className="card-text text-muted">{subtitulo}</p>
                    
                    <Link to={`/noticia/${id}`} className="btn btn-primary btn-sm mt-auto">
                        Leer más
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NoticiaCard;