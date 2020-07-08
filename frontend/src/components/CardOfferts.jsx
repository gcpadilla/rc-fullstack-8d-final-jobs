import React, { useState, useEffect } from 'react';
import axios from "axios";
import sweetalert from "sweetalert2";

const CardOfferts = (props) => {
  const [active, setactive] = useState("");

 useEffect(() => {
   if (props.data.active===true) {
     setactive("Activa")
   } else {
     setactive("Inactiva")
   }
 }, []);

 const activar = async() => {
   console.log(props.data.active);
   
  if (props.data.active===true) {
    try {
      await axios.put(
        `http://localhost:3001/api/v1/offers/${props.data._id}`,
       { active: false}
      );
    
    } catch (error) {
      console.log(error);
    }
    setactive("Activa")
  } else {
    try {
      await axios.put(
        `http://localhost:3001/api/v1/offers/${props.data._id}`,
       { active: true}
      );
    
    } catch (error) {
      console.log(error);
    }
    
    setactive("Inactiva")
  }
  console.log(props.data.active);
  
 }
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
      <div className="card-body dataBody"> 
        <h3 className="card-text datosCartel"> {props.data.title} </h3>
        <h3 className="card-title tituloCartel">{props.data.summary}</h3>
        <h3 className="card-text datosCartel">
          {props.data.workplace} - {props.data.availability}
        </h3>
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
          <button
            type="submit"
            onClick={activar}
            className="btn btn-warning rounded-pill mr-3"
          >
           {active}
          </button>
        </dir>
      </div>
    </div>
  );
};

export default CardOfferts;
