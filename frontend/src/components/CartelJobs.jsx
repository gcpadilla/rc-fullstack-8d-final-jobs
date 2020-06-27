import React from 'react'
import '.././App.css'



function CartelJobs (props) {
    return (
        <div className="card m-2 shadow border-0 cartelJobs container d-flex flex-row justify-content-between align-items-center">
            <div className="card-body dataBody col-8">
                <h3 className="card-text datosCartel"> {props.empresa} </h3>
                <h3 className="card-title tituloCartel">{props.puesto}</h3>
                <h3 className="card-text datosCartel">{props.lugar} - {props.modalidad}</h3>
                <p className="card-text tiempoCartel">{props.tiempoPublicacion}</p>
            </div>
            <img className="col-4 imageLogoCard rounded-circle" src={props.logoEmpresa} alt="logo-empresa"/>
        </div>
        )   
    }

export default CartelJobs