import React, { useState } from "react";
import { MdPlace, MdDescription, MdEventAvailable } from "react-icons/md";
// import { Link } from "react-router-dom";
// import searchImage from "../images/search.svg";
import { Modal } from "react-bootstrap";
import FormPostulate from "./FormPostulate";

const CardPostulation = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    props.get();
    setShow(false)
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="card cartelCategories m-3" onClick={handleShow}>
        <div className="card-body">
          <h5 className="card-title">{props.titulo}</h5>
          <h6 className="card-subtitle mb-2">{props.descripcion}</h6>
          <p className="card-text text-muted">{props.vacantes} vacantes</p>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="tituloCartel"> oferta de {props.titulo}</Modal.Title>
        </Modal.Header>
        <div className="card">
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><MdDescription/> {props.all.description}</li>
            <li className="list-group-item"><MdEventAvailable/> {props.all.availability}</li>
            <li className="list-group-item"><MdPlace/> {props.all.workplace}</li>
          </ul>
        </div>
        <Modal.Body>
          <FormPostulate all={props.all} postu={props} cerrar={handleClose} postularse={false} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CardPostulation;
