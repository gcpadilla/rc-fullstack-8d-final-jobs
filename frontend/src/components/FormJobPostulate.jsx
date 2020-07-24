import React from "react";
import { useState } from "react";
// import Button from './Button'
import Swal from "sweetalert2";
import axios from "axios";

const FormJobPostulate = (props) => {
  const [UserSelec, setUserSelec] = useState({});

  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/v1/offers", UserSelec);
      setUserSelec({});
            await Swal.fire({
  icon: 'success',
  title: 'se creo correctamente la oferta',
  showConfirmButton: false,
  width: 250,  
  timer: 1000
}) 
      // await Swal.fire("genial", "se creo correctamente la oferta", "success");
      // props.crear();
      props.forzar();
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
  };

  const onInputChange = (e) => {
    setUserSelec({
      ...UserSelec,
      [e.target.name]: e.target.value,
      publicationdate: new Date().toLocaleString(),
    });
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h3 className="titulos my-3">Crear Ofertas</h3>

      <form onSubmit={onsubmit}>
        <div className="form-row">
        <div className="col-md-6 col-sm-12 form-group">
          <input
            type="text"
            required
            className="form-control "
            name="title"
            placeholder="Titulo del Puesto"
            onChange={onInputChange}
            autoFocus
          />
        </div>
        <div className="col-md-6 col-sm-12 form-group">
          <input
            type="text"
            required
            className="form-control "
            name="summary"
            placeholder="Resumen"
            onChange={onInputChange}
          />
        </div>
        <div className="col-md-6 col-sm-12 form-group">
          <textarea
            className="form-control"
            required
            name="description"
            placeholder="Descripción"
            onChange={onInputChange}
          />
        </div>
        <div className="col-md-6 col-sm-12 form-group">
          <input
            type="text"
            required
            className="form-control"
            name="profession"
            placeholder="Profesion"
            onChange={onInputChange}
          />
        </div>
        <div className="col-md-6 col-sm-12 form-group">
          <input
            type="text"
            required
            className="form-control "
            name="workplace"
            placeholder="Lugar de trabajo"
            onChange={onInputChange}
          />
        </div>
        <div className="col-md-6 col-sm-12 form-group">
          <input
            type="number"
            required
            className="form-control"
            name="quota"
            placeholder="cupo"
            onChange={onInputChange}
          />
        </div>
        <div className="col-md-6 col-sm-12 form-group">
          <select
            className="form-control"
            onChange={onInputChange}
            name="availability"
            required
          >
            <option>disponibilidad</option>
            <option>Media Jornada</option>
            <option>Jornada Completa</option>
          </select>
        </div>
        <div className="col-md-6 col-sm-12 form-group">
          <select
            className="form-control"
            onChange={onInputChange}
            name="categories"
            required
          >
            <option>elija una categoria</option>
            <option>informatica</option>
            <option>construccion</option>
          </select>
          </div>
        </div>

  

      <div className="buttonOptions d-flex ">
      <button
                onClick={props.forzar}
                className="btn btn-danger rounded-pill mr-5"
              >
                Cancelar
              </button>
        <button
          type="submit"
          // onClick={() => props.crear(true)}
          className="btn btn-success rounded-pill"
        >
          Crear oferta
        </button>
        {/* <Button className="mr-2" name="Crear oferta" /> */}
        {/* <Button className="mr-2" name="Publicar" /> */}
      </div>
      </form>
    </div>
  );
};

export default FormJobPostulate;
