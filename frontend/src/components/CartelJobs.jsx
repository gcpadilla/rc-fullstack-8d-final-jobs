import React from 'react'
import '.././App.css'


function CartelJobs (props) {
    return (
        <div className="card m-3 shadow border-0 cartelJobs container d-flex flex-row justify-content-between align-items-center">
            <div className="card-body dataBody col-8">
                <p className="card-text"> {props.empresa} </p>
                <h3 className="card-title">{props.puesto}</h3>
                <p className="card-text">{props.lugar} - {props.modalidad}</p>
                <p className="card-text">{props.tiempoPublicacion}</p>
            </div>
            <img className="col-4 imageLogoCard rounded-circle" src={props.logoEmpresa} alt="logo-empresa"/>
        </div>
        )   
    }


export default CartelJobs 