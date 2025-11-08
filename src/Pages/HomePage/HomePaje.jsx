
//fernanflo aca hice este cambio pero ahi deje lo que tenia comentado por si me lo tiro, la idea es que esta clase deje de ser dinamica y que traiga los datos bien 


import React, { useState, useEffect } from 'react';
import NoticiaCard from '../../Components/NoticiaCard/NoticiaCard'; // Esta ruta ya la tenías bien
// import { db } from '../../firebase/config'; // (Próximamente)
// import { collection, query, where, getDocs } from 'firebase/firestore'; // (Próximamente)

// --- DATOS DE EJEMPLO ---
// Mientras conectas Firebase, puedes usar estos datos.
// El RF-07 indica que solo deben mostrarse las de estado "Publicado" 
const noticiasDeEjemplo = [
    { id: '1', titulo: 'Avance en IA', subtitulo: 'Nuevo modelo supera benchmarks.', categoria: 'Tecnología', imagen: 'https://via.placeholder.com/300x200?text=IA', estado: 'Publicado' },
    { id: '2', titulo: 'Final de Liga', subtitulo: 'El equipo local se corona campeón.', categoria: 'Deportes', imagen: 'https://via.placeholder.com/300x200?text=Deportes', estado: 'Publicado' },
    { id: '3', titulo: 'Cumbre Climática', subtitulo: 'Nuevos acuerdos globales.', categoria: 'Política', imagen: 'https://via.placeholder.com/300x200?text=Política', estado: 'Publicado' },
    { id: '4', titulo: 'Borrador de Noticia', subtitulo: 'Esto no debería verse.', categoria: 'Tecnología', imagen: null, estado: 'Edición' },
    { id: '5', titulo: 'Estreno de Película', subtitulo: 'La más taquillera del año.', categoria: 'Cultura', imagen: 'https://via.placeholder.com/300x200?text=Cultura', estado: 'Publicado' },
    { id: '6', titulo: 'Otro de Tecnología', subtitulo: 'Lanzamiento nuevo celular.', categoria: 'Tecnología', imagen: 'https://via.placeholder.com/300x200?text=Celular', estado: 'Publicado' },
];
// --- FIN DATOS DE EJEMPLO ---


const HomePage = () => {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Aquí es donde traerías las noticias desde Firebase
        const fetchNoticias = async () => {
            try {
                /*
                // Lógica real de Firebase (descomentar cuando estés listo)
                const noticiasRef = collection(db, "noticias");
                // RF-11 y RF-07: Traer solo las que están "Publicado" [cite: 11, 31]
                const q = query(noticiasRef, where("estado", "==", "Publicado"));
                
                const querySnapshot = await getDocs(q);
                const listaNoticias = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setNoticias(listaNoticias);
                */

                // Por ahora, usamos los datos de ejemplo filtrados
                // Filtramos solo las 'Publicado' 
                setNoticias(noticiasDeEjemplo.filter(n => n.estado === 'Publicado'));

            } catch (error) {
                console.error("Error al cargar noticias: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNoticias();
    }, []);

    if (loading) {
        // Un spinner de Bootstrap mientras cargan los datos
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    // RF-11: Agrupar noticias por categoría 
    const noticiasAgrupadas = noticias.reduce((acc, noticia) => {
        const categoria = noticia.categoria || 'General';
        if (!acc[categoria]) {
            acc[categoria] = [];
        }
        acc[categoria].push(noticia);
        return acc;
    }, {});


    return (
        <div className="home-page">
            <h1 className="mb-4">Últimas Noticias</h1>
            
            {/* Iteramos sobre cada categoría agrupada */}
            {Object.entries(noticiasAgrupadas).map(([categoria, noticiasDeCategoria]) => (
                <section key={categoria} className="mb-5">
                    {/* El h2 se crea dinámicamente */}
                    <h2 className="border-bottom pb-2 mb-3">{categoria}</h2>
                    
                    {/* Usamos la grilla de Bootstrap. 'row-cols-md-3' significa 3 columnas en desktop */}
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        
                        {/* Iteramos y creamos una Card por cada noticia, pasándole la prop */}
                        {noticiasDeCategoria.map(noticia => (
                            <NoticiaCard key={noticia.id} noticia={noticia} />
                        ))}
                    </div>
                </section>
            ))}

            {/* Manejo por si no hay noticias publicadas */}
            {noticias.length === 0 && !loading && (
                 <div className="alert alert-secondary" role="alert">
                    No hay noticias publicadas en este momento.
                 </div>
            )}
        </div>
    );
};

 



















// import React from 'react';
// import NoticiaCard from '../../Components/NoticiaCard/NoticiaCard';

// const HomePage = () => {
//     return (
//         <div>
//             {/* seccion de tecnologia*/}
//             <h2 className="mt-4 mb-3">Tecnología</h2>

//             <div className="row g-4">

//                 <div className="col-md-4">
//                     <NoticiaCard />
//                 </div>

//                 <div className="col-md-4">
//                     <NoticiaCard />
//                 </div>

//                 <div className="col-md-4">
//                     <NoticiaCard />
//                 </div>
//             </div>

//             {/* seccion de deportes */}
//             <h2 className="mt-5 mb-3">Deportes</h2>
//             <div className="row g-4">

//                 <div className="col-md-4">
//                     <NoticiaCard />
//                 </div>


//             </div>

//         </div>
//     );
// };

export default HomePage;