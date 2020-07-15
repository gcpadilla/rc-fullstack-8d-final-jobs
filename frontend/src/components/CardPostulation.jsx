import React, { useState } from "react";
import { Link } from "react-router-dom";
// import searchImage from "../images/search.svg";
import { Button, Modal } from "react-bootstrap";
import FormPostulate from "./FormPostulate";

const CardPostulation = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    console.log("aqui");
    props.get();
    setShow(false)};
  const handleShow = () => setShow(true);

  return (
    <div className="card m-3 cartelCategories">
      <div style={{cursor: "pointer"}} onClick={handleShow} >
        <div className="card-body">
          {/* <img src={searchImage} alt="buscar" /> */}
          <h5 className="card-title tituloCartel">{props.titulo}</h5>
          <h5 className="card-title tituloCartel">{props.descripcion}</h5>
          <p className="card-text tiempoCartel">{props.vacantes} vacantes</p>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Postularse a la oferta de {props.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormPostulate all={props.all} postu={props} cerrar={handleClose} postularse={false}/>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CardPostulation;
