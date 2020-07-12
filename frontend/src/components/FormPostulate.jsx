import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

const FormPostulate = (props) => {
  const [UserSelec, setUserSelec] = useState({});
  const onsubmit = async (e) => {
    e.preventDefault();
    console.log(props.all._id);
    try {
        await axios.post(`http://localhost:3001/api/v1/offer/postulates/${props.all._id}`, UserSelec, );
      setUserSelec({});
      await Swal.fire("genial", "te postulaste correctamente", "success");
      props.cerrar();
    } 
    catch (err) {
      if (err.response.data.message === undefined) {
        Swal.fire(
          `Error de ${err.response.data.errors[0].param}`,
          err.response.data.errors[0].msg,
          "error"
        );
      } else {
        Swal.fire("Oops..", err.response.data.message, "error");
      }
    }
    
  
  };

  const onInputChange = (e) => {
    setUserSelec({
      ...UserSelec,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h3 className="titulos my-3">Crear Ofertas</h3>

      <form className="was-validated">
        <div className="form-row">
          <div className="col-md-6 col-sm-12 form-group">
            <input
              type="number"
              required
              className="form-control "
              name="intendedsalary"
              placeholder="Sueldo Pretendido"
              onChange={onInputChange}
            />
          </div>
          <div className="col-md-6 col-sm-12 form-group">
            <input
              type="email"
              required
              className="form-control "
              name="emailcandidate"
              placeholder="Email de contacto"
              onChange={onInputChange}
            />
          </div>
          <div className="col-md-6 col-sm-12 form-group">
            <textarea
              className="form-control"
              required
              name="experiences"
              placeholder="Experiencia Laboral"
              onChange={onInputChange}
            />
          </div>
          <div className="col-md-6 col-sm-12 form-group">
            <textarea
              className="form-control"
              required
              name="studies"
              placeholder="Estudios"
              onChange={onInputChange}
            />
          </div>
        </div>
        <Modal.Footer>
          <Button variant="secondary btn  rounded-pill" onClick={props.cerrar}>
            Cerrar
          </Button>
          <Button variant="btn btn-success rounded-pill" onClick={onsubmit}>
            Postularse
          </Button>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default FormPostulate;
