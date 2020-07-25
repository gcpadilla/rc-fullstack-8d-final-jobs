import React from 'react'
import '.././App.css'
import { Link } from 'react-router-dom'


function FullCartelJobs(props) {
    return (
        <>
            <div className="card m-2 shadow border-0 cartelJobs container d-flex flex-column">

                <div className="card-body row align-items-center">
                    <div className="dataBody col-8 ">
                        <h3 className="card-text datosCartel"> {props.empresa} </h3>
                        <h3 className="card-title tituloCartel">{props.puesto}</h3>
                        <h3 className="card-text datosCartel">{props.lugar} - {props.modalidad}</h3>
                        <p className="card-text descriptionOffer">{props.descripcion}</p>

                        <p className="card-text tiempoCartel">{props.tiempoPublicacion}</p>
                    </div>
                    <div className="col-4">
                        <img className="imageLogoCard card-img rounded-circle btn-sm" src={props.logoEmpresa} alt="logo-empresa" />
                    </div>
                    <Link to="/" className="btn btn-primary btn-sm rounded-pill mr-1 mt-1">{props.button} Testing</Link>
                    <Link to="/" className="btn btn-primary btn-sm rounded-pill mr-1 mt-1">{props.button} Testing</Link>


                </div>
            </div>


        </>
    )
}

export default FullCartelJobs