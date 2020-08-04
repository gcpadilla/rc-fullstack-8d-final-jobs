import React from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import "../App.css";


import FullCartelJobs from '../components/FullCartelJobs'
import SearchImage from '../images/search.svg'


const Offers = () => {

    const jobs = [
        {empresa: "Empresa",
        puesto: "puesto",
        lugar:"lugar",
        modalidad:"Part-Time",
        tiempo: "Hace XX dias",
        imagen: SearchImage,
        descripcion:"LorenIpsum LorenIpsum LorenIpsum LorenIpsum LorenIpsum",
        },
        {empresa: "Empresa",
        puesto: "Puesto Puesto",
        lugar:"lugar",
        modalidad:"Part-Time",
        tiempo: "Hace XX dias",
        descripcion:"LorenIpsum LorenIpsum LorenIpsum LorenIpsum LorenIpsum",
        imagen: SearchImage,
        }
    ]
    return (
        <div>
            <Header />
            <div className="d-flex flex-column align-items-center my-5">
                <div className="titulares d-flex container align-items-centers">
                    <h3 className="titulos col-10" >Puestos Disponibles</h3>
                </div>
                <div className="d-flex flex-wrap justify-content-center">
                {jobs.map ((job,i) => {
                    return <FullCartelJobs 
                    empresa={job.empresa} 
                    puesto={job.puesto} 
                    lugar={job.lugar} 
                    modalidad={job.modalidad}
                    tiempoPublicacion={job.tiempo}
                    descripcion={job.descripcion}
                    logoEmpresa={job.imagen}
                    key={i}
                    />
                })}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Offers;