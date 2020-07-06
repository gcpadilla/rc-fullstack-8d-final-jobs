import React from "react";

const CardOfferts = (props) => {
  return (
    <div className="card m-2 shadow border-0 cartelJobs container d-flex flex-row justify-content-between align-items-center">
      <div className="card-body dataBody col-8">
        <h3 className="card-text datosCartel"> {props.data.title} </h3>
        <h3 className="card-title tituloCartel">{props.data.summary}</h3>
        <h3 className="card-text datosCartel">
          {props.data.workplace} - {props.data.availability}
        </h3>
        <p className="card-text tiempoCartel">{props.data.publicationdate}</p>
        <dir>
          {" "}
          <button type="submit" className="btn btn-primary rounded-pill mx-5" >Modificar</button>
          <button type="submit" className="btn btn-primary rounded-pill mx-5">Editar</button>{" "}
        </dir>
      </div>
    </div>
  );
};

export default CardOfferts;
