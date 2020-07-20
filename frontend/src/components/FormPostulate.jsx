import React from "react";
import { useState } from "react";
import { MdSave, MdAttachMoney } from "react-icons/md";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

const FormPostulate = (props) => {
  const [UserSelec, setUserSelec] = useState(props.postu);
  console.log(props);
  const onDelete = () => {
    try {
      Swal.fire({
        title: "¿Estás Seguro?",
        text: "Esta acción no se puede recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borrar!",
      }).then(async (result) => {
        if (result.value) {
          await axios.delete(
            `http://localhost:3001/api/v1/offer/postulates/${props.postu._id}`
          );
          Swal.fire({
            icon: "success",
            text: "Oferta eliminada...",
            width: 250,
            showConfirmButton: false,
            timer: 2000,
          });
          props.cerrar();
        }
      });
    } catch (error) { }
  };

  const onsubmit = async (e) => {
    if (props.postularse === true) {
      e.preventDefault();
      try {
        await axios.put(
          `http://localhost:3001/api/v1/offer/postulates/${props.postu._id}`,
          UserSelec
        );
        setUserSelec({});
        await Swal.fire(
          "genial",
          "se modifico correctamente la postulación",
          "success"
        );
        props.cerrar();
      } catch (err) {
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
    } else {
      e.preventDefault();
      try {
        await axios.post(
          `http://localhost:3001/api/v1/offer/postulates/${props.all._id}`,
          UserSelec
        );
        setUserSelec({});
        await Swal.fire("genial", "te postulaste correctamente", "success");
        props.cerrar();
      } catch (err) {
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
      <h4 className="titulos mb-3">Crear Postulación</h4>
      <form onSubmit={onsubmit}>
        <div className="form-row">
        <div className="input-group mb-3 col-md-6 col-sm-12">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">$</span>
          </div>
          <input  
          type="number"
              required
              className="form-control "
              defaultValue={props.postu.intendedsalary}
              name="intendedsalary"
              placeholder="Sueldo Pretendido"
              onChange={onInputChange} aria-describedby="basic-addon1" />
        </div>
          <div className="col-md-6 col-sm-12 form-group">
            <input
              type="email"
              required
              className="form-control "
              name="emailcandidate"
              defaultValue={props.postu.emailcandidate}
              placeholder="Email de contacto"
              onChange={onInputChange}
            />
          </div>
          <div className="col-md-6 col-sm-12 form-group">
            <textarea
              className="form-control"
              required
              name="experiences"
              defaultValue={props.postu.experiences}
              placeholder="Experiencia Laboral"
              onChange={onInputChange}
            />
          </div>
          <div className="col-md-6 col-sm-12 form-group">
            <textarea
              className="form-control"
              required
              name="studies"
              defaultValue={props.postu.studies}
              placeholder="Estudios"
              onChange={onInputChange}
            />
          </div>
        </div>
        <Modal.Footer>
          <Button variant="danger btn rounded-pill" onClick={props.cerrar}>
            Cerrar
          </Button>
          {props.postularse ? (
            <div>
              <button
                type="submit"
                className="btn btn-success rounded-pill"
              >
                {" "}
                Modificar
              </button>

              <Button
                variant="btn btn-warning  rounded-pill mx-2"
                onClick={onDelete}
              >
                Delete
              </Button>
            </div>
          ) : (
              <div>
                <button
                  style={{ verticalAlign: 'middle' }}
                  type="submit"
                  className="btn btn-success rounded-pill"
                >
                  {" "}
                  <MdSave /> Postularse
              </button>
              </div>
            )}
        </Modal.Footer>
      </form>
    </div>
  );
};

export default FormPostulate;
