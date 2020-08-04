import React from "react";
import logo from "../images/RollingJobswhite.svg";
import { NavLink, Link } from "react-router-dom";
import LoginLogoutButton from "../components/LoginLogoutButton";
import auth from "../utils/auth";
import {BsPerson} from "react-icons/bs"
import {IoMdBusiness, IoIosBusiness} from "react-icons/io"

const Navbar = () => {

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark cabeceraWeb">
      <Link className="navbar-brand" to="/">
    <img src={logo} width="180" height="" alt="" loading="lazy"/>
  </Link>
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
              {/* <li>
                <NavLink className="nav-link text-white" to="/">
                  <AiOutlineHome/> Home
                </NavLink>
              </li> */}
              <li className="nav-item dropdown mr-2">
                <NavLink
                  className="nav-link dropdown-toggle text-white"
                  role="button"
                  data-toggle="dropdown"
                  to="/"
                >
                 <BsPerson/> Candidatos
                </NavLink>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  {auth.isAuthenticated() ? (
                    <Link className="dropdown-item" to="/PerfilUser">
                      Mi Perfil
                    </Link>
                  ) : (
                    <></>
                  )}

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
                 <IoMdBusiness/> Empresas
                </NavLink>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <Link className="dropdown-item" to="faqbusiness">
                    Preguntas Frecuentes
                  </Link>
                  <Link className="dropdown-item" to="/prices">
                    Precios
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
                 <IoIosBusiness/> Institucional
                </NavLink>

                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <Link className="dropdown-item" to="/informacion">
                    ¿Quienes Somos?
                  </Link>
                  {/* <Link className="dropdown-item" to="/prensa">
                    Prensa
                  </Link> */}
                  <Link className="dropdown-item" to="/contacto">
                    Contacto
                  </Link>
                </div>
              </li>
              <LoginLogoutButton
              // id={id}
              />
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
