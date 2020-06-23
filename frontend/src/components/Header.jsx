import React from 'react'
import Button from './Button'
import '.././App.css'
import logo from '../images/RollingJobswhite.svg'
import {NavLink, Link} from 'react-router-dom'
function Navbar() {

  return (
    <nav className="navbar navbar-expand-lg navbar-light cabeceraWeb">
      <img className="logoStyle" src={logo} alt="logo" />
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse row justify-content-end" id="navbarNavDropdown">
        <div className="d-flex align-items-end">
          <ul className="navbar-nav mr-5">
            <li className="nav-item dropdown mr-2">
              <NavLink className="nav-link dropdown-toggle text-white" role="button" data-toggle="dropdown"  to="/" >Candidatos</NavLink>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <Link className="dropdown-item" to="/">Preguntas Frecuentes</Link>
                <Link className="dropdown-item" to="/">Empleos por Categorías</Link>
              </div>
            </li>

            <li className="nav-item dropdown mr-2">
              <NavLink className="nav-link dropdown-toggle text-white" to="/" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Empresas
        </NavLink>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <Link className="dropdown-item" to="/">Preguntas Frecuentes</Link>
                <Link className="dropdown-item" to="/">Precios</Link>
                <Link className="dropdown-item" to="/">Publicar Empleos</Link>
              </div>
            </li>

            <li className="nav-item dropdown mr-2">
              <NavLink className="nav-link dropdown-toggle text-white" to="/" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Institucional
        </NavLink>

              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <Link className="dropdown-item" to="/">¿Quienes Somos?</Link>
                <Link className="dropdown-item" to="/">Prensa</Link>
                <Link className="dropdown-item" to="/">Contacto</Link>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav mr-5">
            <li className="nav-item active mr-2">
              <NavLink className="nav-link text-white" to="/">Regístrate <span className="sr-only">(current)</span></NavLink>
            </li>
            <Button name="Iniciá Sesión" className="botonHeader" />
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default Navbar