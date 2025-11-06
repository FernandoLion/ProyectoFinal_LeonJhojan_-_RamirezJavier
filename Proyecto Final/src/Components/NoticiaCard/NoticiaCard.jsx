import React from 'react';
import styles from './NoticiaCard.module.css';

const NoticiaCard = () => {
    const imagen = "noImage";

    return (
        <div className="card h-100 shadow-sm">
            <img src={imagen} className="card-img-top" alt="Noticia" />
            <div className="card-body">
                <p className="card-text">
                </p>

                <a href="/noticia/1" className="btn btn-primary btn-sm">Leer más</a>
            </div>
        </div>
    );
};

export default NoticiaCard;