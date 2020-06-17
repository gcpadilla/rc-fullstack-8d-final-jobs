import React from 'react'
import '.././App.css'


function CartelCategories (props) {
    return (
        <div className="card m-3 cartelCategories">
            <div className="card-body">
                <img src={props.imagen} alt={props.nombreCategoria}/>
                <h3 className="card-title tituloCartel">{props.tituloCategoria}</h3>
                <p className="card-text tiempoCartel">{props.vacantes} vacantes</p>
            </div>
        </div>
        )   
    }


export default CartelCategories