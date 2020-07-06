import React, { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios";

import CardOfferts from "../components/CardOfferts";
import FormID from "../components/FormID";
import FormJobPostulate from "../components/FormJobPostulate";
import PostulationsJobs from "../components/PostulationsJobs";

const Company = () => {
  const [username, setUsername] = useState("");
  const [publicar, setpublicar] = useState(true);
  const [card, setcard] = useState(true);
  const params = useParams();

  const [data, setdata] = useState([]);

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

  const mostrarPublicar = () => {
    if (publicar === false) {
      setpublicar(true);
    } else {
      setpublicar(false);
    }
  };

  const mostrarcard = () => {
    if (card === false) {
      setcard(true);
    } else {
      setcard(false);
    }
  };

  const cards = data.map((a) => (
    <div key={a._id} >
      <CardOfferts data={a} key={a._id} />
    </div>
  ));

  return (
    <>
      <Header />
      <div className="companyData d-flex flex-column align-items-center my-3">
        <h3>Bienvenido {username}</h3>
        <div className="modifData">
          <div className=" d-flex justify-content-around my-3">
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
          {publicar ? (
            <div></div>
          ) : (
            <div>
              <FormJobPostulate crear={mostrarPublicar} />
            </div>
          )}
          {card ? <div></div> : <div>{cards}</div>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Company;
