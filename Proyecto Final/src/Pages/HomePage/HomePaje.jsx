import React from 'react';
import NoticiaCard from '../../Components/NoticiaCard/NoticiaCard';

const HomePage = () => {
    return (
        <div>
            {/* seccion de tecnologia*/}
            <h2 className="mt-4 mb-3">Tecnología</h2>

            <div className="row g-4">

                <div className="col-md-4">
                    <NoticiaCard />
                </div>

                <div className="col-md-4">
                    <NoticiaCard />
                </div>

                <div className="col-md-4">
                    <NoticiaCard />
                </div>
            </div>

            {/* seccion de deportes */}
            <h2 className="mt-5 mb-3">Deportes</h2>
            <div className="row g-4">

                <div className="col-md-4">
                    <NoticiaCard />
                </div>


            </div>

        </div>
    );
};

export default HomePage;