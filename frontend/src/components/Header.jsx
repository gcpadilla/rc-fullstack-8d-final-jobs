import React from 'react'
import Button from './Button'
import '.././App.css'

function Navbar () { 

    return (
<nav className="navbar navbar-expand-lg navbar-light cabeceraWeb">
  <a className="navbar-brand text-white" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavDropdown">
    <ul className="navbar-nav mr-5">

      <li className="nav-item dropdown mr-2">
        <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Candidatos
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="#">Preguntas Frecuentes</a>
          <a className="dropdown-item" href="#">Empleos por Categorías</a>
        </div>
      </li>

      <li className="nav-item dropdown mr-2">
        <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Empresas 
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="#">Preguntas Frecuentes</a>
          <a className="dropdown-item" href="#">Precios</a>
          <a className="dropdown-item" href="#">Publicar Empleos</a>
        </div>
      </li>

      <li className="nav-item dropdown mr-2">
        <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Institucional
        </a>

        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <a className="dropdown-item" href="#">¿Quienes Somos?</a>
          <a className="dropdown-item" href="#">Prensa</a>
          <a className="dropdown-item" href="#">Contacto</a>
        </div>
      </li>
      </ul>
        <ul className="navbar-nav mr-5">
          <li className="nav-item active mr-2">
            <a className="nav-link text-white" href="#">Regístrate <span className="sr-only">(current)</span></a>
          </li>
          <Button name="Iniciá Sesión" className="botonHeader" />
        </ul>
  </div>
</nav>
)
}
export default Navbar