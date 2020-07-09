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

  const update = (_id) => {
    setpublicar(true);
    setcard(true);
    setedit(false);
    console.log(_id);
    setid(_id)
    
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
    <div className="container-fluid">
      <div className="row">
        {/* <Header /> */}
        <nav id="sidebarMenu" className="col-3 d-md-block bg-dark sidebar collapse sidebarMenu">

      <div className="sidebar-sticky">
        <img src={logo} loading="lazy" className="logoFooter" />
          <h2 className="text-white">Bienvenido {username}</h2>

          <ul className="nav flex-column mt-5">
          <li className="nav-item">
              <Link  type="submit" onClick={mostrarPublicar} className="text-white"> Crear Ofertas</Link>
          </li>
          <li className="nav-item">
              <Link  type="submit" onClick={mostrarcard} className="text-white"> Ofertas Publicadas</Link>
          </li>
          </ul>            



      </div>
    </nav>

      <div className=" col-9 companyData card d-flex flex-wrap">
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
              <EditOffers id={id} terminar={mostrarcard}/>
            </div>
          )}

        </div>


        </div>
        </div>


      {/* <Footer /> */}
      </div>
      
  );
};

export default Company;
