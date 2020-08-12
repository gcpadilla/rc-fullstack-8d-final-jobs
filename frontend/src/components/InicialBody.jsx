import React from "react";
import logo from "../images/RollingJobswhite.svg";
import Search from "./Search";

const InicialBody = () => {
  return (
    <div className="homeInicial d-flex flex-column align-items-center justify-content-start">
      <img className="logoPortada" src={logo} alt="Logo" />
      <div className="text-white text-center mt-5">
        <h3>El paso a un</h3>
        <h3 className="infoInicial">nuevo trabajo</h3>
        <h3>empieza aquí</h3>
      </div>
      <Search />
      <div className="linksLoguin d-flex align-items-center">
        <div></div>
      </div>
    </div>
  );
};
export default InicialBody;
