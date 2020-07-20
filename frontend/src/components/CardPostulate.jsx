import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import searchImage from "../images/search.svg";
import { Button, Modal } from "react-bootstrap";
import FormPostulate from "./FormPostulate";

const CardPostulate = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => {
      props.get();
      setShow(false)};
    const handleShow = () => {
      console.log("show");
      setShow(true)};

    const [data, setdata] = useState([]);
    const getArticles = useCallback(async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/offers/${props.all.offerid}`
        );
        setdata(response.data);
      } catch (error) {
      }
    }, []);
  
  
    useEffect(() => {
      getArticles();
    }, [getArticles]);
    
  
    return (
      <div className="card m-3 cartelCategories">
        <button onClick={handleShow}  className="text-decoration-none btn btn-link">
          <div className="card-body">
            <h5 className="card-title tiempoCartel "> Postulado a la oferta de </h5>
            <h5 className="card-title tituloCartel ">{data.title}</h5>
            <p className="card-title tiempoCartel text-muted ">Estado: {props.all.state}</p>
          </div>
        </button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Editar postulacion de {props.titulo}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormPostulate all={data} postu={props.all} cerrar={handleClose} postularse={true} />
          </Modal.Body>
        </Modal>
      </div>
    );
};

export default CardPostulate;