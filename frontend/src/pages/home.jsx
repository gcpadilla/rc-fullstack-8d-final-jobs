import React, { useState, useEffect } from "react";
// import React from 'react';
import Header from "../components/Header";
import OfertaInicio from "../components/OfetasInicio"
import OfertaInicioUser from "../components/OfertaInicioUser"
import InicialBody from "../components/InicialBody";
import Body from "../components/Body";
import BodyDown from "../components/BodyDown";
import Footer from "../components/Footer";
import auth from "../utils/auth";


const Home = () => {
  return (
    <div>
      <Header  />
      <InicialBody />
      <Body />
      {auth.isAuthenticated() ?<OfertaInicioUser /> : <OfertaInicio />}  
      <BodyDown />
      <Footer />
    </div>
  );
};

export default Home;
