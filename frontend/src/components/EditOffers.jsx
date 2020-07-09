import { useState} from "react";
import React from "react";
import Swal from "sweetalert2";
import axios from "axios";


const EditOffers = (props) => {
  const [UserSelec, setUserSelec] = useState({});

  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3001/api/v1/offers/${props.oferta._id}`,
        UserSelec
      );
      setUserSelec({});
      await Swal.fire(
        "genial",
        "se modifico correctamente la oferta",
        "success"
      );
      props.terminar();
    } catch (error) {
      console.log(error);
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
      <h3>Editar Oferta {props.oferta.summary}</h3>

      <form>
        <div className="form-group">
          <input
            type="text"
            required
            className="form-control "
            name="title"
            defaultValue={props.oferta.title}
            placeholder="Titulo del Puesto"
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            required
            className="form-control "
            name="summary"
            defaultValue={props.oferta.summary}
            placeholder="Resumen"
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            required
            name="description"
            defaultValue={props.oferta.description}
            placeholder="Descripción"
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            required
            className="form-control"
            name="profession"
            defaultValue={props.oferta.profession}
            placeholder="Profesion"
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            required
            className="form-control "
            name="workplace"
            defaultValue={props.oferta.workplace}
            placeholder="Lugar de trabajo"
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            required
            className="form-control"
            name="quota"
            defaultValue={props.oferta.quota}
            placeholder="cupo"
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <select
            className="form-control"
            onChange={onInputChange}
            name="active"
            defaultValue={props.oferta.active}
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>
        <div className="form-group">
          <select
            className="form-control"
            onChange={onInputChange}
            name="availability"
            defaultValue={props.oferta.availability}
          >
            <option>disponibilidad</option>
            <option>Media Jornada</option>
            <option>Jornada Completa</option>
          </select>
        </div>
        <div className="form-group">
          <select
            className="form-control"
            onChange={onInputChange}
            name="categories"
            defaultValue={props.oferta.categories}
          >
            <option>elija una categoria</option>
            <option>informatica</option>
            <option>construccion</option>
          </select>
        </div>
      </form>
      <div className="buttonOptions d-flex justify-content-between">
        <button
          type="submit"
          onClick={onsubmit}
          // onClick={() => props.crear(true)}
          className="btn btn-success rounded-pill"
        >
          Editar oferta
        </button>
        {/* <Button className="mr-2" name="Crear oferta" /> */}
        {/* <Button className="mr-2" name="Publicar" /> */}
      </div>
    </div>
  );
};

export default EditOffers;
