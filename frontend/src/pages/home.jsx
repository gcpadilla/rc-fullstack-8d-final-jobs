// import React from 'react';
import Header from "../components/Header";
import OfertaInicio from "../components/OfetasInicio"
import InicialBody from "../components/InicialBody";
import Body from "../components/Body";
import BodyDown from "../components/BodyDown";
import Footer from "../components/Footer";
import React, { useState, useEffect } from "react";


const Home = () => {
   
  return (
    <div>
      <Header  />
      <InicialBody />
      <Body />
      <OfertaInicio/>
      <BodyDown />
      <Footer />
    </div>
  );
};

export default Home;
