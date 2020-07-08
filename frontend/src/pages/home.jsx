// import React from 'react';
import Header from "../components/Header";
import BodyCategories from "../components/BodyCategories";

import InicialBody from "../components/InicialBody";
import Body from "../components/Body";
import BodyDown from "../components/BodyDown";
import Footer from "../components/Footer";
import React, { useState, useEffect } from "react";

import FaqCandidates from "./faqsCandidates";

const Home = () => {
   
  return (
    <div>
     
      <Header  />
      {/* <FaqCandidates /> */}
      <InicialBody />
      <Body />
      <BodyCategories />
      <BodyDown />
      <Footer />
    </div>
  );
};

export default Home;
