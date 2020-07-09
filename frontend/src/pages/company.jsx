import React, { useState, useEffect, useCallback } from "react";
import Footer from "../components/Footer";
import axios from "axios";
import CardOfferts from "../components/CardOfferts";
import FormJobPostulate from "../components/FormJobPostulate";
import EditOffers from "../components/EditOffers"
import { Link } from 'react-router-dom'

import logo from "../images/RollingJobswhite.svg";


const Company = () => {
  const [username, setUsername] = useState("");
  const [publicar, setpublicar] = useState(true);
  const [card, setcard] = useState(true);
  const [edit, setedit] = useState(true);
  const [data, setdata] = useState([]);
  const [id, setid] = useState("");

  const getArticles = useCallback(async () => {
    const response = await axios.get(
      "http://localhost:3001/api/v1/offers/admin/all"
    );
    setdata(response.data);
  }, []);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  const forzar = () => {
    getArticles();
    setpublicar(true);
  };

  const update = (oferta) => {
    setpublicar(true);
    setcard(true);
    setedit(false);
    setid(oferta)
    
  };

  const mostrarPublicar = () => {
    if (publicar === false) {
      setpublicar(true);
    } else {
      setpublicar(false);
    }
    getArticles();
    setcard(true);
    setedit(true);
  };

  const mostrarcard = () => {
    if (card === false) {
      setcard(true);
    } else {
      setcard(false);
    }
    getArticles();
    setpublicar(true);
    setedit(true);
  };

  // const editcard = () => {
  //   if (edit === false) {
  //     setedit(true);
  //   } else {
  //     setedit(false);
  //   }
  //   getArticles()
  // };

  const cards = data.map((a) => (
    <div key={a._id}>
      <CardOfferts
        data={a}
        key={a._id}
        cerrar={mostrarcard}
        forzar={forzar}
        update={update}
      />
    </div>
  ));



  return (
    <>
    {/* <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow position-static">
  <ul className="navbar-nav px-3">
    <li className="nav-item text-nowrap">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
    </li>
  </ul>
</nav> */}

    <div className=" container-fluid">
      <div className="row">
        {/* <Header /> */}
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-inline sidebar collapse sidebarMenu sticky-top ">

        <img src={logo} loading="lazy" className="logoStyle" />


      <div className="sidebar-sticky d-flex flex-column justify-content-around mb-3">
          <h2 className="textAdmin text-white">Bienvenido {username}</h2>

          <ul className="nav flex-column d-flex mt-5">
          <li className="nav-item">
              <Link  type="submit" onClick={mostrarPublicar} className="text-white"> Crear Ofertas</Link>
          </li>
          <li className="nav-item">
              <Link  type="submit" onClick={mostrarcard} className="text-white"> Ofertas Publicadas</Link>
          </li>
          </ul>            
          <ul className="nav flex-column d-flex mt-5">
                      <li className="nav-item">
              <Link className="mt-auto" type="submit" className="text-white"> Cerrar Sesión</Link>
          </li>
          </ul>


      </div>
    </nav>

      <div className=" col-md-9 col-lg-10 companyData d-flex flex-column flex-wrap">
        <div className="">

        </div>
        <div className="">
          {publicar ? (
            <div></div>
          ) : (
            <div>
              <FormJobPostulate crear={mostrarPublicar} />
            </div>
          )}
          {card ? <div></div> : <div>
            <h3 className="titulos text-center my-3">Ofertas Publicadas</h3>
            <div className="d-flex flex-wrap justify-content-center"> 
            {cards}
            </div> 
            </div>}


          {edit ? (
            <div></div>
          ) : (
            <div>
              <EditOffers oferta={id} terminar={mostrarcard}/>
            </div>
          )}

        </div>


        </div>
        </div>


      {/* <Footer /> */}
      </div>
      </>
  );
};

export default Company;
