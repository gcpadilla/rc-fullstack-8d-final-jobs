import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
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
  const [role, setrole] = useState(localStorage.getItem("role")); // eslint-disable-line no-unused-vars
  const history = useHistory();

  // console.log(role);
  const actualizar = () => {
    getpostulation();
    getuser();
  };

  // TRAIGO TODA LAS OFERTAS
  const getuser = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/offers/candidate/all"
      );
      setdatauser(response.data);
    } catch (error) {
      // console.log("no tiene ofertas");
      setdatauser([]);
    }
  }, []);

  // TRAIGO TODA LAS POSTULACIONES
  const getpostulation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/offer/postulates/user/all"
      );
      setdatapostulation(response.data);
    } catch (error) {
      // console.log("no tiene postulaciones");
      setdatapostulation([]);
    }
  };
  // CON ESTO CONTROLO QUE ESTE AUTENTICADO Y ADEMAS NO SEA UN ADMIN
  useEffect(() => {
    if (auth.isAuthenticated() === true) {
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
            // datauser={datauser}
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
