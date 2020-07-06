import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import FormID from "../components/FormID";
import FormJobPostulate from "../components/FormJobPostulate";
import PostulationsJobs from "../components/PostulationsJobs";

const Company = () => {
  const [username, setUsername] = useState("");
  const [publicar, setpublicar] = useState(true);
  const [crear, setcrear] = useState(true);
  const [card, setcard] = useState(true);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  const mostrarPublicar = () => {
    if (publicar === false) {
      setpublicar(true);
    } else {
      setpublicar(false);
    }
  };
  const mostrarcrear = () => {
    if (crear === false) {
      setcrear(true);
    } else {
      setcrear(false);
    }
  };

  const mostrarcard = () => {
    if (card === false) {
      setcard(true);
    } else {
      setcard(false);
    }
  };

  return (
    <>
      <Header />
      <div className="companyData d-flex flex-column align-items-center my-3">
        <h3>Bienvenido {username}</h3>
        <div className="modifData">
          <div className=" d-flex justify-content-around my-3">
          <button
              type="submit"
              onClick={mostrarcrear}
              className="btn btn-primary rounded-pill mx-5"
            >
             modificar Ofertas
            </button>
            {/* <Link className="aTituloLinks " to="/modifate_data">crear Datos </Link> */}
            <button
              type="submit"
              onClick={mostrarPublicar}
              className="btn btn-primary rounded-pill mx-5"
            >
             Crear Ofertas
            </button>
            {/* <Link className="aTituloLinks " to="/publicar">Publicar Empleo</Link> */}
            <button
              type="submit"
              onClick={mostrarcard}
              className="btn btn-primary rounded-pill mx-5"
            >
            Ofertas
            </button>
            {/* <Link className="aTituloLinks " to="/postulates">Postulaciones</Link> */}
          </div>
          
          {crear ? <div></div> : (
            <div>
             <FormID />
            </div>
          )}
          {publicar ? <div></div> : (
            <div>
              <FormJobPostulate crear={mostrarPublicar} />
            </div>
          )}
            {card ? <div></div> : (
            <div>
              <PostulationsJobs />              
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Company;
