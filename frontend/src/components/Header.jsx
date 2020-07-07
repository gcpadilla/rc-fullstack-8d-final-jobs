import React from "react";

// import Button from './Button'
import ".././App.css";
import logo from "../images/RollingJobswhite.svg";
import { NavLink, Link } from "react-router-dom";
import LoginLogoutButton from "./LoginLogoutButton";
// import { useState } from 'react';
// import FaqsCandidates from "../pages/faqsCandidates";
// import FaqBusiness from "../pages/FaqsBusiness";
// import FormJobPostulate from "../components/FormJobPostulate";

const Navbar = (props) => {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light cabeceraWeb">
        <img className="logoStyle" src={logo} alt="logo" />
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="navbarGeneral collapse navbar-collapse"
          id="navbarNavDropdown"
        >
          <div className="navbarStyle d-flex align-items-end">
            <ul className="navbar-nav mr-5">
              <li className="nav-item dropdown mr-2">
                <NavLink
                  className="nav-link dropdown-toggle text-white"
                  role="button"
                  data-toggle="dropdown"
                  to="/"
                >
                  Candidatos
                </NavLink>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <Link className="dropdown-item" to="/faqcandidates">
                    Preguntas Frecuentes
                  </Link>
                  <Link className="dropdown-item" to="/offers">
                    Empleos por Categorías
                  </Link>
                </div>
              </li>

              <li className="nav-item dropdown mr-2">
                <NavLink
                  className="nav-link dropdown-toggle text-white"
                  to="/"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Empresas
                </NavLink>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <Link className="dropdown-item" to="/company">
                    Perfil
                  </Link>
                  <Link className="dropdown-item" to="faqbusiness">
                    Preguntas Frecuentes
                  </Link>
                  <Link className="dropdown-item" to="/prices">
                    Precios
                  </Link>
                  <Link className="dropdown-item" to="/publicJob">
                    Publicar Empleos
                  </Link>
                </div>
              </li>

              <li className="nav-item dropdown mr-2">
                <NavLink
                  className="nav-link dropdown-toggle text-white"
                  to="/"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Institucional
                </NavLink>

                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <Link className="dropdown-item" to="/informacion">
                    ¿Quienes Somos?
                  </Link>
                  <Link className="dropdown-item" to="/prensa">
                    Prensa
                  </Link>
                  <Link className="dropdown-item" to="/contacto">
                    Contacto
                  </Link>
                </div>
              </li>
            </ul>
              <LoginLogoutButton user={props.user}/>
          </div>
        </div>
      </nav>

    </div>
  );
};
export default Navbar;
