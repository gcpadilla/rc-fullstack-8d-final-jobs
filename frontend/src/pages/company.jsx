import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CardOfferts from "../components/CardOfferts";
import FormJobPostulate from "../components/FormJobPostulate";
import EditOffers from "../components/EditOffers";
import auth from "../utils/auth";
import sweetalert from "sweetalert2";
import { Link, useHistory } from "react-router-dom";

import logo from "../images/RollingJobswhite.svg";
import AdminEditPostulation from "../components/AdminEditPostulation";

const Company = () => {
  const [username, setUsername] = useState("");
  const [publicar, setpublicar] = useState(true);
  const [card, setcard] = useState(false);
  const [edit, setedit] = useState(true);
  const [postulation, setpostulation] = useState(true);
  const [data, setdata] = useState([]);
  const [id, setid] = useState("");
  const [photo, setPhoto] = useState(false);
  const handleClose = () => setPhoto(false);
  const handleShow = () => setPhoto(true);
  const history = useHistory();
  const [idpost, setidpost] = useState("");

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
    setcard(false);
    setpublicar(true);
  };

  const update = (oferta) => {
    setpublicar(true);
    setcard(true);
    setedit(false);
    setid(oferta);
    setpostulation(true);
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
    setpostulation(true);
  };

  const mostrarcard = () => {
    setcard(false);
    getArticles();
    setpublicar(true);
    setedit(true);
    setpostulation(true);
  };

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

    try {
      await axios.get("http://localhost:3001/api/v1/users/candidates/logout");
      auth.logout();
      await sweetalert.fire("", "sesion cerrada", "success");
      history.push("/");
      handleClose();
    } catch (error) {
      sweetalert.fire("ERROR", "error de deslogueo", "error");
    }
  };
  const adminPostulate = (data) => {
    setcard(true);
    getArticles();
    setidpost(data);
    setpublicar(true);
    setedit(true);
    setpostulation(false);
    console.log(data);
  };

  const cards = data.map((a) => (
    <div key={a._id}>
      <CardOfferts
        data={a}
        key={a._id}
        cerrar={mostrarcard}
        forzar={forzar}
        update={update}
        adminPostulate={adminPostulate}
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
              <img src={logo} loading="lazy" className="logoStyle mb-3" />
            </Link>

            <div className="sidebar-sticky d-flex flex-column justify-content-around mb-3">
              <h2 className="textAdmin text-white">Bienvenido {username}</h2>

              <ul className="nav flex-column d-flex mt-5">
                <li className="nav-item">
                  <Link onClick={mostrarPublicar} className="text-white">
                    {" "}
                    Crear Ofertas
                  </Link>
                </li>
                <li className="nav-item">
                  <Link onClick={mostrarcard} className="text-white">
                    {" "}
                    Ofertas Publicadas
                  </Link>
                </li>
              </ul>
              <ul className="nav flex-column d-flex mt-5">
                <li className="nav-item">
                  <Link
                    className="mt-auto"
                    onClick={signOutHandler}
                    className="text-white"
                  >
                    {" "}
                    Cerrar Sesión
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <div className=" col-md-9 col-lg-10 companyData d-flex flex-column flex-wrap">
            <div className=""></div>
            <div className="">
              {publicar ? (
                <div></div>
              ) : (
                <div>
                  <FormJobPostulate crear={mostrarPublicar} forzar={forzar} />
                </div>
              )}
              {card ? (
                <div></div>
              ) : (
                <div>
                  <h3 className="titulos text-center my-3">
                    Ofertas Publicadas
                  </h3>
                  <div className="d-flex flex-wrap justify-content-center">
                    {cards}
                  </div>
                </div>
              )}

              {edit ? (
                <div></div>
              ) : (
                <div>
                  <EditOffers oferta={id} terminar={mostrarcard} />
                </div>
              )}

              {postulation ? (
                <div></div>
              ) : (
                <div>
                  {console.log(idpost)}
                  <AdminEditPostulation idpost={idpost} />
                  postulacion
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
