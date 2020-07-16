import React, { useState, useCallback, useEffect} from "react";
import axios from "axios";
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

  const actualizar = () => {
    getpostulation()
    getuser()
  }
  const getuser = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/offers/candidate/all"
      );
      setdatauser(response.data);
    } catch (error) {
      console.log("no tiene ofertas");
      setdatauser([])
    }
  }, []); 

  const getpostulation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/offer/postulates/user/all"
      );
      setdatapostulation(response.data);
    } catch (error) {
      console.log("no tiene postulaciones");
      setdatapostulation([])
    }
  };
  
  
    useEffect(() => {
     if (auth.isAuthenticated()===true) {
   actualizar()
     }
  }, [auth.isAuthenticated()]);
  return (
    <div>
      <Header />
      <InicialBody />
      <Body />
      {auth.isAuthenticated() ? (
        <div>
          <OfertaInicioUser get={actualizar} datauser={datauser}/>
          <PostulationInicio get={actualizar} datapostulation={datapostulation} />
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
