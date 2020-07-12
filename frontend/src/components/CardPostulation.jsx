import React, { useState } from "react";
import { Link } from "react-router-dom";
import searchImage from "../images/search.svg";
import { Button, Modal } from "react-bootstrap";
import FormPostulate from "./FormPostulate";

const CardPostulation = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
        <div className="card m-3 cartelCategories">
            
            <Link onClick={handleShow} to="/" >
                   <div className="card-body">
                <img src={searchImage} alt="buscar"/>
                <h5 className="card-title tituloCartel">{props.titulo}</h5>
                <h5 className="card-title tituloCartel">{props.descripcion}</h5>
                <p className="card-text tiempoCartel">{props.vacantes} vacantes</p>
            </div>
            </Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
    <Modal.Title>Postularse a la oferta de {props.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* {console.log(props.all)} */}
<FormPostulate all={props.all} cerrar={handleClose} /> 
        </Modal.Body>
       
      </Modal>
            {/* <div className="card text-white bg-primary micard m-1">
                <div className="card-header"><img src={searchImage} alt="buscar" /></div>
                <div className="card-body">
                <h5 className="card-title">{props.titulo}</h5>
                    <p className="card-title">{props.descripcion}</p>
                    <p className="card-text">{props.vacantes} vacantes</p>
                </div> */}
            {/* </div> */}
        
         
        </div>
    );
};

export default CardPostulation;