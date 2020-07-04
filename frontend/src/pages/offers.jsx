import React from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import "../App.css";


import CartelJobs from '../components/CartelJobs'
import searchImage from '../images/search.svg'


const Offers = () => {

    const jobs = [
        {empresa: "Empresa",
        puesto: "puesto",
        lugar:"lugar",
        modalidad:"Part-Time",
        tiempo: "Hace XX dias",
        imagen: searchImage,
        },
        {empresa: "Empresa",
        puesto: "Puesto Puesto",
        lugar:"lugar",
        modalidad:"Part-Time",
        tiempo: "Hace XX dias",
        imagen: searchImage,
        }
    ]
    return (
        <div>
            <Header />
            <div className="d-flex flex-column align-items-center my-5">
                <div className="titulares d-flex container align-items-centers">
                    <h3 className="titulos col-10" >Puestos Recientes</h3>
                </div>
                <div className="distriCards d-flex flex-wrap justify-content-center">
                {jobs.map (job => {
                    return <CartelJobs 
                    empresa={job.empresa} 
                    puesto={job.puesto} 
                    lugar={job.lugar} 
                    modalidad={job.modalidad}
                    tiempoPublicacion={job.tiempo}
                    logoEmpresa={job.imagen}
                    />
                })}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Offers;