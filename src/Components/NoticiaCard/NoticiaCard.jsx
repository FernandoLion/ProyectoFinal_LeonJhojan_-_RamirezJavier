import React from 'react';
import { Link } from 'react-router-dom';

const NoticiaCard = ({ noticia }) => {
    // Desestructuramos los datos que esperamos de la noticia
    const { id, titulo = "Título no disponible", subtitulo = "", imagen, categoria = "General" } = noticia;

    // --- ESTA ES LA SOLUCIÓN ---
    // Si la prop 'imagen' no existe (es null o undefined), 
    // usamos un placeholder de via.placeholder.com.
    const imageUrl = imagen || `https://via.placeholder.com/300x200?text=${categoria}`;

    return (
        // Usamos 'col' para que funcione dentro de una grilla (row) de Bootstrap
        <div className="col"> 
            <div className="card h-100 shadow-sm">
                
                {/* Usamos imageUrl, que NUNCA estará vacía */}
                <img src={imageUrl} className="card-img-top" alt={titulo} style={{ height: '200px', objectFit: 'cover' }} />
                
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