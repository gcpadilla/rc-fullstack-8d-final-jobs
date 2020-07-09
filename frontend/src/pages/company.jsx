import React, { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import CardOfferts from "../components/CardOfferts";
import FormJobPostulate from "../components/FormJobPostulate";
import EditOffers from "../components/EditOffers"

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
          {card ? <div></div> : <div  className="d-flex flex-wrap">{cards}</div>}
          {edit ? (
            <div></div>
          ) : (
            <div>
              <EditOffers oferta={id} terminar={mostrarcard}/>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Company;
