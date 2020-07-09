import React from "react";

import styles from  "../styles.module.css";
import { Link } from "react-router-dom";
import logo from "../images/RollingJobswhite.svg";
import Search from "./Search";
import LoginLogoutButton from "./LoginLogoutButton";

const InicialBody = () => {

  const style = {
    backgroundColor: "blue",
  }

  return (
    <div className="homeInicial d-flex flex-column align-items-center justify-content-around">
      <img className="logoPortada" src={logo} alt="Logo" />
      <div className="text-white text-center ">
        <h3>El paso a un</h3>
        <h3 className="infoInicial">nuevo trabajo</h3>
        <h3>empieza aquí</h3>
      </div>
      <Search />
      <div className="linksLoguin d-flex align-items-center">
        <div>
          {/* <LoginLogoutButton /> */}
        </div>
      </div>
    </div>
  );
};
export default InicialBody;
