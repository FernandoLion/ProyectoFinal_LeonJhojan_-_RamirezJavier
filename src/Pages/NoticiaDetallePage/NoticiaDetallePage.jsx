import React from 'react';

const NoticiaDetallePage = () => {
  const imagenEjemplo = "NoImage"; 
  const categoriaEjemplo = "";
  const tituloEjemplo = "";
  const subtituloEjemplo = "";
  const autorEjemplo = "";
  const fechaEjemplo = "";
  const contenidoEjemplo = "";

  return (

    <div className="row justify-content-center">
      <div className="col-lg-8">
        
        {/*aqui va la categoria*/}
        
        <h5 className="text-primary mt-4">{categoriaEjemplo}</h5>
        
        {/* aqui va el titulo */}
        <h1 className="display-4 fw-bold mt-2">{tituloEjemplo}</h1>
        
        {/* aqui ca el subtitulo */}
        <p className="lead mt-3">{subtituloEjemplo}</p>
        
        {/* aqui van algunos metadatos, fecha y autor*/}
        <div className="text-muted mb-3">
          Por <strong>{autorEjemplo}</strong> | Publicado: {fechaEjemplo}
        </div>
        
        {/* aqui va la imagen principal */}
        <img src={imagenEjemplo} className="img-fluid rounded mb-4" alt="Imagen principal de la noticia" />

        
        {/* aqui va el contenido de la noticia, usamos dangerouslyset, porque nos va ayudar a renderizar en html  */}
        <div 
          className="mt-4" 
          dangerouslySetInnerHTML={{ __html: contenidoEjemplo }} 
        />
        
      </div>
    </div>
  );
};

export default NoticiaDetallePage;