import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import sweetalert from "sweetalert2";
import { Link, useHistory } from "react-router-dom";
import CardOfferts from "../components/CardOfferts";
import FormJobPostulate from "../components/FormJobPostulate";
import EditOffers from "../components/EditOffers";
import AdminEditPostulation from "../components/AdminEditPostulation";
import auth from "../utils/auth";
import logo from "../images/RollingJobswhite.svg";

const Company = () => {
  const [username, setUsername] = useState(localStorage.getItem("username")); // eslint-disable-line no-unused-vars
  const [display, setdisplay] = useState(2);
  const [data, setdata] = useState([]);
  const [id, setid] = useState("");
  const [idpost, setidpost] = useState("");
  const history = useHistory();

  // TRAIGO LAS OFERTAS CREADAS
  const getArticles = useCallback(async () => {
    const response = await axios.get(
      "http://localhost:3001/api/v1/offers/admin/all"
    );
    setdata(response.data);
  }, []);
  useEffect(() => {
    getArticles();
  }, [getArticles]);

  // VUELVO A LA PAGINA PRINCIPAL DE ADMINISTRADOR CON LAS CARD DE OFERTAS
  const forzar = () => {
    getArticles();
    setdisplay(2);
  };

  // DESLOGEO Y VUELVO INICIO
  const signOutHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.get(
        "http://localhost:3001/api/v1/users/administrators/logout"
      );
      auth.logout();
      await sweetalert.fire("ADMINISTRADOR", "sesion cerrada", "success");
      history.push("/");
      return;
    } catch (error) {}
  };

  // SETEO EL LO Q SE VE AL EN ADMIN
  const crearOferta = () => {
    setdisplay(1);
  };
  const mostrarOfertas = () => {
    getArticles();
    setdisplay(2);
  };
  const update = (oferta) => {
    setid(oferta);
    setdisplay(3);
  };
  const postuladosAOferta = (data) => {
    setidpost(data);
    setdisplay(4);
  };

  // CARGO LAS CARD CON LAS OFERTAS
  const cards = data.map((a) => (
    <div key={a._id}>
      <CardOfferts
        data={a}
        key={a._id}
        cerrar={mostrarOfertas}
        forzar={forzar}
        update={update}
        adminPostulate={postuladosAOferta}
      />
    </div>
  ));

  return (
    <>
      <div className=" companyStyle container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-inline sidebar collapse sidebarMenuAdmin sticky-top "
          >
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                loading="lazy"
                className="logoStyle mb-3"
              />
            </Link>
            <div className="sidebar-sticky d-flex flex-column justify-content-around mb-3">
              <h2 className="textAdmin text-white">Bienvenido {username}</h2>
              <ul className="nav d-flex flex-column mt-5">
                <li className="nav-item">
                  <button
                    onClick={crearOferta}
                    className="text-white btn btn-link"
                  >
                    {" "}
                    Crear Ofertas
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    onClick={mostrarOfertas}
                    className="text-white btn btn-link"
                  >
                    {" "}
                    Ofertas Publicadas
                  </button>
                </li>
              </ul>
              <ul className="nav flex-column d-flex mt-5">
                <li className="nav-item">
                  <button
                    onClick={signOutHandler}
                    className="text-white btn btn-link mt-auto"
                  >
                    {" "}
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          </nav>

          <div className=" col-md-9 col-lg-10 companyData d-flex flex-column flex-wrap">
            <div className=""></div>
            <div className="">
              {display === 1 ? (
                <div>
                  <FormJobPostulate
                    // crear={crearOferta}
                    forzar={forzar}
                  />
                </div>
              ) : (
                <></>
              )}
              {display === 2 ? (
                <div>
                  <h3 className="titulos text-center my-3 testingBackground">
                    Ofertas Publicadas
                  </h3>
                  <div className="d-flex flex-wrap justify-content-center">
                    {cards}
                  </div>
                </div>
              ) : (
                <></>
              )}

              {display === 3 ? (
                <div>
                  <EditOffers oferta={id} terminar={mostrarOfertas} />
                </div>
              ) : (
                <></>
              )}

              {display === 4 ? (
                <div>
                  <AdminEditPostulation idpost={idpost} />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Company;
