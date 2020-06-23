import React from 'react'
import '.././App.css'
import {Link} from 'react-router-dom'
import logo from '../images/RollingJobswhite.svg'
import Search from './Search'
import Button from './Button'

 

const InicialBody = () => {

    return (
      <div className="homeInicial d-flex flex-column align-items-center justify-content-around">
          {/* style={{backgroundImage: `url(${Moon}`}} */}
        <img className="logoPortada" src={logo} alt="Logo" />
        <div className="text-white text-center ">
        <h3>El paso a un</h3>
        <h3 className="infoInicial">nuevo trabajo</h3>
        <h3>empieza aquí</h3>
        </div>
        <Search />
        <div className="linksLoguin">
          <Link className="mr-3" to="/">Registrate</Link>
          <Button className="ml-3" name="Iniciá Sesión" />
        </div>
      </div>
    );

}
export default InicialBody
