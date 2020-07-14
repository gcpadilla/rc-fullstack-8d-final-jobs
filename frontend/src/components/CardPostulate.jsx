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
    const handleShow = () => setShow(true);
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
        <Link onClick={handleShow} to="/">
          <div className="card-body">
            <h5 className="card-title tituloCartel">Postulado a la oferta de {data.title}</h5>
            <h5 className="card-title tituloCartel text-muted">Estado: {props.all.state}</h5>
          </div>
        </Link>
  
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