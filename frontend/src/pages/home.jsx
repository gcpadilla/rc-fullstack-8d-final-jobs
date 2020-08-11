import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import OfertaInicio from "../components/OfetasInicio";
import OfertaInicioUser from "../components/OfertaInicioUser";
import InicialBody from "../components/InicialBody";
import Body from "../components/Body";
import BodyDown from "../components/BodyDown";
import Footer from "../components/Footer";
import PostulationInicio from "../components/PostulationInico";
import auth from "../utils/auth";

const Home = () => {
  const [datapostulation, setdatapostulation] = useState([]);
  const [datauser, setdatauser] = useState([]);
  const [role, setRole] = useState(localStorage.getItem("role"));
  const history = useHistory();

  const actualizar = () => {
    getpostulation();
    getuser();
  };

  // VERIFICAR SI ES ADMIN 0
  const administrado0 = useCallback(async () => {
    try {
      const response = await axios.get(
        "/api/v1/users/administrators/"
      );
      if (response.data.message === "No existia") {
        await Swal.fire({
          title: 'Bienvenido',
          html: `<h5>Es el primer inicio de la aplicación. Para comenzar, ingresa los siguientes datos: </h5>
<p>Username: Administrador0</p>
<p>password: Administrador0</p>
<h5>¡Muchas Gracias!</h5>`,
          showConfirmButton: true,
          width: 300,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    administrado0()
  }, [administrado0]);

  // TRAIGO TODA LAS OFERTAS
  const getuser = useCallback(async () => {
    try {
      const response = await axios.get(
        "/api/v1/offers/candidate/all"
      );
      setdatauser(response.data);
    } catch (error) {
      setdatauser([]);
    }
  }, []);

  // TRAIGO TODA LAS POSTULACIONES
  const getpostulation = async () => {
    try {
      const response = await axios.get(
        "/api/v1/offer/postulates/user/all"
      );
      if (!response.data.message) {
        setdatapostulation(response.data);
      }

    } catch (error) {
      setdatapostulation([]);
    }
  };

  // CON ESTO CONTROLO QUE ESTE AUTENTICADO Y ADEMAS NO SEA UN ADMIN
  useEffect(() => {
    if (auth.isAuthenticated() === true) {
      setRole(localStorage.getItem("role"))
      if (role === "admin") {
        history.push("/company");
      }
      actualizar();
    }
  }, [auth.isAuthenticated()]);

  return (
    <div>
      <Header />
      <InicialBody />
      <Body />
      {auth.isAuthenticated() ? (
        <div className="d-flex flex-wrap">
          <OfertaInicioUser get={actualizar} datauser={datauser} />
          <PostulationInicio
            get={actualizar}
            datapostulation={datapostulation}
          />
        </div>
      ) : (
          <div>
            <OfertaInicio />
          </div>
        )}
      <BodyDown />
      <Footer />
    </div>
  );
};

export default Home;
