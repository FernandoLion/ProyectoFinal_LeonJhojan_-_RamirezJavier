import React, { useState, useEffect } from 'react';
import NoticiaCard from '../../Components/NoticiaCard/NoticiaCard';
import { db } from '../../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore'; 

const HomePage = () => {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                // activamos la logica de firebase
                const noticiasRef = collection(db, "noticias");
                // solo traemos la que tienne estado publicado
                const q = query(noticiasRef, where("estado", "==", "Publicado"));
                
                const querySnapshot = await getDocs(q);
                const listaNoticias = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setNoticias(listaNoticias);

            } catch (error) {
                console.error("Error al cargar noticias: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNoticias();
    }, []); 

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    // codigo de javi javi pa agrupar en categorias
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
            
            {Object.entries(noticiasAgrupadas).map(([categoria, noticiasDeCategoria]) => (
                <section key={categoria} className="mb-5">
                    <h2 className="border-bottom pb-2 mb-3">{categoria}</h2>
                    
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {noticiasDeCategoria.map(noticia => (
                            <NoticiaCard key={noticia.id} noticia={noticia} />
                        ))}
                    </div>
                </section>
            ))}

            {noticias.length === 0 && !loading && (
                 <div className="alert alert-secondary" role="alert">
                    No hay noticias publicadas en este momento.
                 </div>
            )}
        </div>
    );
};

export default HomePage;