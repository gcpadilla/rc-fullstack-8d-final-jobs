import React from 'react'
import '.././App.css'
import logo from '../images/RollingJobswhite.svg'

const Footer = () => {
return (
    <div className="footerWeb d-flex justify-content-around">
        <img className="col-6 logoFooter justify-content-start" src={logo} alt="Logo" /> 
        <div className="col-6 d-flex flex-wrap align-items-center">
        <div className="col-4 dataInstitucional text-white ">
            <h3 className="tituloFooter">Institucional</h3>
            <ul className="tituloLinks">
                <li>¿Quiénes Somos?</li>
                <li>Prensa</li>
                <li>Contacto</li>
            </ul>
        </div>
        <div className="col-4 dataCandidatos text-white align-items-start">
        <h3 className="tituloFooter align-self-start">Candidatos</h3>
            <ul className="tituloLinks">
                <li>Preguntas frecuentes</li>
                <li>Empleos por Categorías</li>
            </ul>
        </div>
        <div className="col-4 Empresa text-white">
        <h3 className="tituloFooter">Empresas</h3>
            <ul className="tituloLinks">
                <li>Preguntas frecuentes</li>
                <li>Precios</li>
                <li>Publicar Empleo</li>
            </ul>
        </div>
        </div>


        </div>
)
}

export default Footer