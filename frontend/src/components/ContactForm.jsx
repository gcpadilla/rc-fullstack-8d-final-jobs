import React from "react";
import image1 from "../images/peopleUno.svg";

const ContactForm = () => {
  return (
    <div className="container d-flex flex-wrap contactFormSize align-items-center">
      <div className="row">
        <div className="d-flex flex-column align-items-center col-sm-12 col-md-6">
          <h3 className="titulos my-3">Comunicate con Nosotros </h3>

          <form>
            <div className="form-row">
              <div className=" col-md-6 col-sm-12 form-group">
                <label className="formLabel">Nombre</label>
                <input
                  type="text"
                  required
                  className="form-control "
                  name="title"
                />
              </div>
              <div className=" col-md-6 col-sm-12 form-group">
                <label className="formLabel">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  className="form-control "
                  name="summary"
                />
              </div>
              <div className="col-md-6 col-sm-12 form-group">
                <label className="formLabel">Descripción</label>
                <textarea
                  className="form-control"
                  required
                  name="description"
                />
              </div>
            </div>
          </form>
          <div className="buttonOptions d-flex justify-content-between">
            <button className="btn btn-danger rounded-pill mr-5">
              Cancelar
            </button>
            <button type="submit" className="btn btn-success rounded-pill">
              Enviar
            </button>
          </div>
        </div>
        <img src={image1} alt="" className="col-sm-12 col-md-6 imgSVG" />
      </div>
    </div>
  );
};

export default ContactForm;
