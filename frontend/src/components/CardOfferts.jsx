import React, { useState, useEffect } from "react";
import axios from "axios";
import sweetalert from "sweetalert2";

const CardOfferts = (props) => {
  const [active, setactive] = useState("");
  const [color, setcolor] = useState("text-success");
  useEffect(() => {
    if (props.data.active === true) {
      setactive("Activa");
      setcolor("text-success");
    } else {
      setactive("Inactiva");
      setcolor("text-muted");
    }
  }, []);

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
              `http://localhost:3001/api/v1/offers/${props.data._id}`
            );
            sweetalert.fire({
              icon: "success",
              text: "Oferta eliminada...",
              width: 250,
              showConfirmButton: false,
              timer: 2000,
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
    <div className="card m-2 shadow border-0 cartelJobs container d-flex flex-row justify-content-between align-items-center">
      {console.log(props.data)}

      <div className="card-body dataBody">
        <h3 className="card-text datosCartel"> {props.data.title} </h3>
        <h3 className="card-title tituloCartel">{props.data.summary}</h3>
        <h3 className="card-text datosCartel">
          {props.data.workplace} - {props.data.availability}
        </h3>
        <p className={`card-text tiempoCartel ${color}`}>{active}</p>
        <p className="card-text tiempoCartel">{props.data.publicationdate}</p>
        <dir className="d-flex justify-content-start">
          {" "}
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
            className="btn btn-primary rounded-pill"
          >
            Borrar
          </button>{" "}
        </dir>
      </div>
    </div>
  );
};

export default CardOfferts;
