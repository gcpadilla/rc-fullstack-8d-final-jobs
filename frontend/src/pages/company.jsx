import React, {useEffect, useState} from "react";
import Header from '../components/Header'
import Footer from '../components/Footer'
import {Link} from 'react-router-dom'


import FormID from '../components/FormID'
import FormJobPostulate from '../components/FormJobPostulate'
import PostulationsJobs from '../components/PostulationsJobs';

const Company = () => {
    // const [token, setToken] = useState({})

    // useEffect(() => {
    //    setToken( JSON.parse(localStorage.getItem("token")))
    //    console.log(token);
       
    // });
 

    return (
        <>
        <Header />
        { console.log( localStorage.getItem("token")) }
        
       
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

export default Company; 
