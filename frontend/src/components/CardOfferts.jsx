import React from "react";
import axios from "axios";
import sweetalert from "sweetalert2";
import { Link } from "react-router-dom";

const CardOfferts = (props) => {
  const onClickDeleteHandler = async () => {
    try {
      sweetalert
        .fire({
          title: "¿Estás Seguro?",
          text: "Esta acción no se puede recuperar",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, borrar!",
        })
        .then(async (result) => {
          if (result.value) {
            await axios.delete(
              `/api/v1/offers/${props.data._id}`
            );
            sweetalert.fire({
              icon: "success",
              text: "Oferta eliminada...",
              width: "auto",
              showConfirmButton: false,
              timer: 1500,
            });
            props.forzar();
          }
        });
    } catch (error) {}
  };
  const onClickUpdateHandler = async () => {
    props.update(props.data);
  };
  
  return (
    <div className="card m-2 shadow  d-flex flex-row justify-content-between align-items-center">
      <div className="card-body dataBody" style={{ width: "309px" }}>
        <h3 className="card-text tituloCartel "> {props.data.title} </h3>
        <h3 className="card-text datosCartel" style={{ height: "35px" }}>
          {props.data.summary}
        </h3>
        <h3 className="card-text datosCartel">
          {props.data.workplace}
        </h3>
        <h3 className="card-text datosCartel">
          {props.data.availability}
        </h3>
        {props.sola ? (
          <></>
        ) : (
          <>
            {" "}
            {props.data.candidateRef.length === 0 ? (
              <p className="card-text tiempoCartel text-muted">
                No hay postulaciones a esta oferta
              </p>
            ) : (
              <>
                <Link
                  to="/company"
                  className="card-text tiempoCartel"
                  onClick={() => props.adminPostulate(props.data._id)}
                >
                  <p>Postulaciones {props.data.postulateRef.length}</p>
                </Link>
              </>
            )}
            <p
              className={`card-text tiempoCartel ${
                props.data.active ? "text-success" : "text-muted"
              }`}
            >
              {props.data.active ? "Activa" : "Inactiva"}
            </p>
          </>
        )}
        <p className="card-text tiempoCartel">{props.data.publicationdate}</p>
        {props.sola ? (
          <div></div>
        ) : (
          <div className="d-flex flex-nowrap justify-content-center">
            <button
              type="submit"
              onClick={onClickUpdateHandler}
              className="btn btn-primary rounded-pill mr-3"
            >
              Modificar
            </button>
            <button
              type="submit"
              onClick={onClickDeleteHandler}
              className="btn btn-danger rounded-pill"
            >
              Borrar
            </button>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardOfferts;
