import React from 'react'
// import searchImage from "../images/search.svg";


function CartelCategories (props) {
    return (
        <div className="card m-3 cartelCategories">
            <div className="card-body">
                {/* <img src={searchImage} alt="buscar"/> */}
                <h5 className="card-title tituloCartel">{props.titulo}</h5>
                <h5 className="card-title tituloCartel">{props.descripcion}</h5>
                <p className="card-text tiempoCartel ">{props.vacantes} vacantes</p>
            </div>
        </div>
        )   
    }


export default CartelCategories