import React from 'react'




function CartelJobs (props) {

    return (
        <div className="card m-2 shadow border-0 cartelJobs container d-flex flex-row justify-content-between align-items-center">
            <div className="card-body dataBody col-8">
                <h3 className="card-text datosCartel"> {props.title} </h3>
                <h3 className="card-title tituloCartel">{props.summary}</h3>
                <h3 className="card-text datosCartel">{props.workplace} - {props.availability}</h3>
                <p className="card-text tiempoCartel">{props.publicationdate}</p>
            </div>


        </div>
    )
}

export default CartelJobs