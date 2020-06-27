import React from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import {BrowserRouter as Router, Switch, Link} from 'react-router-dom'
import "../App.css";


import FormID from '../components/FormID'
import FormJobPostulate from '../components/FormJobPostulate'
import PostulationsJobs from '../components/PostulationsJobs';

const company = () => {
    


    return (
        <>
        <Header />
        <div className="companyData d-flex flex-column align-items-center my-3">
           <h3>Bienvenido "Sr Empresa"</h3> 
                <div className="modifData">
                    <div className=" d-flex justify-content-around my-3">
                            <Link className="aTituloLinks " to="/modifate_data">Modificar Datos</Link>
                            <Link className="aTituloLinks " to="/publicar">Publicar Empleo</Link>
                            <Link className="aTituloLinks " to="/postulates">Postulaciones</Link>

                    </div>
                            <FormID />
                            <FormJobPostulate />
                            <PostulationsJobs />
                </div>
        </div>
        <Footer />
        </>
    );
};

export default company; 
