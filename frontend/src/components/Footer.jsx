import React from 'react'
import '.././App.css'
import logo from '../images/RollingJobswhite.svg'
import { Link } from 'react-router-dom'
// import Offers from '../pages/offers'

const Footer = () => {
    return (
        <div className="footerWeb d-flex justify-content-around">
            <img className="col-6 logoFooter justify-content-start" src={logo} alt="Logo" />
            <div className="col-6 d-flex flex-wrap align-items-top mt-5">
                <div className="col-4 dataInstitucional text-white  d-flex flex-column ">
                    <h3 className="tituloFooter">Institucional</h3>
                    <Link className="tituloLinks" to="/">¿Quiénes Somos?</Link>
                    <Link className="tituloLinks" to="/">Prensa</Link>
                    <Link className="tituloLinks" to="/">Contacto</Link>
                </div>
                <div className="col-4 dataCandidatos text-white d-flex flex-column ">
                    <h3 className="tituloFooter">Candidatos</h3>
                    <Link className="tituloLinks" to="/">Preguntas Frecuentes</Link>
                    <Link className="tituloLinks" to="/frontend/src/pages/offers.jsx" >Empleos por Categorías</Link>
                </div>
                <div className="col-4 Empresa text-white d-flex flex-column">
                    <h3 className="tituloFooter">Empresas</h3>
                    <Link className="tituloLinks" to="/">Preguntas Frecuentes</Link>
                    <Link className="tituloLinks" to="/">Precios</Link>
                    <Link className="tituloLinks" to="/">Publicar Empleo</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer