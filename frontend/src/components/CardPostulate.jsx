import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
// import searchImage from "../images/search.svg";
import { Modal } from "react-bootstrap";
import FormPostulate from "./FormPostulate";

const CardPostulate = (props) => {
  const [show, setShow] = useState(false);
  const [data, setdata] = useState([]);

  // CERRAR MODAL
  const handleClose = () => {
    setShow(false);
    props.get();
  };

  // ABRIR MODAL
  const handleShow = () => {
    setShow(true);
  };

  // TRAE LA OFERTA POR ID
  const getArticles = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/v1/offers/${props.all.offerid}`
      );
      setdata(response.data);
    } catch (error) {
      setdata([])
    }
  }, [props.all.offerid]);

  useEffect(() => {
    getArticles();
  }, [getArticles]);
  return (
    <>
      {data !== null ? (
        <>
          <div className="card cartelCategories m-3" onClick={handleShow}>
            <div className="card-body">
              <h5 className="card-title"> Postulado a </h5>
              <h6 className="card-subtitle mb-2">{data.title}</h6>
              <p className="card-title text-muted">Estado: {props.all.state}</p>
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <FormPostulate
                all={data}
                postu={props.all}
                cerrar={handleClose}
                postularse={true}
              />
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default CardPostulate;
