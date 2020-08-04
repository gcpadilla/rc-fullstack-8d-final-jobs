import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import sweetalert from "sweetalert2";
import { useHistory } from "react-router-dom";
import CardOfferts from "../components/CardOfferts";
import FormJobPostulate from "../components/FormJobPostulate";
import EditOffers from "../components/EditOffers";
import AdminEditPostulation from "../components/AdminEditPostulation";
import auth from "../utils/auth";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { IconContext } from "react-icons";
import { AiOutlineMenuUnfold } from "react-icons/ai";

const Company = () => {
  const [display, setdisplay] = useState(2);
  const [data, setdata] = useState([]);
  const [id, setid] = useState("");
  const [idpost, setidpost] = useState("");
  const username = localStorage.getItem("username");
  const history = useHistory();
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });

  // TRAIGO LAS OFERTAS CREADAS
  const getArticles = useCallback(async () => {
    const response = await axios.get(
      "/api/v1/offers/admin/all"
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
        "/api/v1/users/administrators/logout"
      );
      auth.logout();
      await sweetalert.fire({
        icon: "success",
        title: "Sesión cerrada",
        showConfirmButton: false,
        width: "auto",
        timer: 1500,
      });
      history.push("/");
      return;
    } catch (error) {}
  };

  // SELECCIONO EL DISPLAY EN LA PAGINA DE ADMIN
  const crearOferta = () => {
    setState({ isPaneOpenLeft: false });
    setdisplay(1);
  };
  const mostrarOfertas = () => {
    getArticles();
    setState({ isPaneOpenLeft: false });
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
      <div>
        <div style={{ marginTop: "15px", marginLeft: "15px" }}>
          <div onClick={() => setState({ isPaneOpenLeft: true })}>
            <IconContext.Provider value={{ size: "30px" }}>
              <AiOutlineMenuUnfold />
            </IconContext.Provider>{" "}
            Menu
          </div>
        </div>
        <SlidingPane
          isOpen={state.isPaneOpenLeft}
          from="left"
          width="240px"
          className="bg-primary"
          onRequestClose={() => setState({ isPaneOpenLeft: false })}
        >
          <div>
            <div>
              <h2 className="text-white">Bienvenido</h2>
              <h4 className="text-white mb-5"> {username}</h4>
            </div>
          </div>
          <div className="d-flex flex-column">
            <div>
              <div
                onClick={crearOferta}
                className="btn-link text-white poiter my-3"
              >
                {" "}
                Crear Ofertas
              </div>
            </div>
            <div>
              <div
                onClick={mostrarOfertas}
                className="btn-link text-white poiter mb-3"
              >
                {" "}
                Ofertas publicadas
              </div>
            </div>
            <div>
              <div
                onClick={signOutHandler}
                className="btn-link text-white poiter mb-3"
              >
                {" "}
                Cerrar Sesión
              </div>{" "}
            </div>
          </div>
        </SlidingPane>
      </div>
      <div className="container">
        <div className="row">
          {display === 1 ? (
            <div className="container">
              <div className="col-11">
                <FormJobPostulate
                  forzar={forzar}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
          {display === 2 ? (
            <div className="container">
              <div className="col-11">
                <h3 className="text-center">Ofertas Publicadas</h3>
                <div className="d-flex flex-wrap justify-content-center justify-content-md-start">
                  {cards}
                </div>
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
            <>
              <div className="col-1"></div>
              <div className="col-11">
                <AdminEditPostulation idpost={idpost} />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Company;
