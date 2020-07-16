import React, { useState, useEffect, useCallback } from "react";
import Footer from "../components/Footer";
import axios from "axios";
import CardOfferts from "../components/CardOfferts";
import FormJobPostulate from "../components/FormJobPostulate";
import EditOffers from "../components/EditOffers"
import { Link } from 'react-router-dom'
import auth from "../utils/auth";
import sweetalert from "sweetalert2";
import { useHistory } from "react-router-dom";
import logo from "../images/RollingJobs.svg";
import profilePH from "../images/profile.jpg"

const CandidateProfile = () => {
    return (
        <div className=" companyStyle container-fluid">
        <div className="row">
          <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-inline sidebar collapse sidebarMenu sticky-top ">
  
        <Link to="/">
          <img src={logo} loading="lazy" className="logoStyle mb-3" />
        </Link>
  
        <div className="sidebar-sticky d-flex flex-column justify-content-around mb-3">
            <h2 className="textAdmin text-dark">Bienvenido usuario</h2>

             <img src={profilePH} className="profilePH img-fluid mx-auto d-block rounded-circle" />
  
            <ul className="nav flex-column d-flex mt-5">
            <li className="nav-item">
                <Link  type="submit"  className="text-dark"> Modificar Perfil</Link>
            </li>
            <li className="nav-item">
                <Link  type="submit"  className="text-dark"> Ver Postulaciones</Link>
            </li>
            <li className="nav-item">
                <Link  type="submit"  className="text-dark"> Ofertas Publicadas </Link>
            </li>
            </ul>            
            <ul className="nav flex-column d-flex mt-5">
                        <li className="nav-item">
                <Link className="mt-auto" type="submit"  className="text-dark"> Cerrar Sesión</Link>
            </li>
            </ul>
  
        </div>
      </nav>
  
        <div className=" col-md-9 col-lg-10 companyData d-flex flex-column flex-wrap">
          <div className="">
  
          </div>
          <div className="">
            {/* {publicar ? ( */}
              <div></div>
             
            {<div></div> ? <div></div> : <div>
              <h3 className="titulos text-center my-3">Ofertas Publicadas</h3>
              <div className="d-flex flex-wrap justify-content-center"> 
              {/* {cards} */}
              </div> 
              </div>}
  
  
            {<div></div> ? (
              <div></div>
            ) : (
              <div>
                {/* <EditOffers oferta={id} terminar={mostrarcard}/> */}
              </div>
            )}
  
          </div>
  
  
          </div>
          </div>
  
  
        {/* <Footer /> */}
        </div>
    );
};

export default CandidateProfile;