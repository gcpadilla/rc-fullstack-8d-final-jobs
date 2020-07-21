import React from "react";
import CardPostulation from "./CardPostulation";

const OfertasInicioUser = (props) => {
  return (
    <>
        <div className="d-flex- align-items-center my-5 generalBody">
          <div className="titulares d-flex justify-content-center justify-content-md-arround my-3">
            <h3 className="titulos col-10">Ofertas de trabajo</h3>
          </div>
          <div className="container">
            <div className="d-flex flex-wrap justify-content-center justify-content-md-start">
              {props.datauser.map((a, i) => {
                return (
                  <CardPostulation
                    all={a}
                    titulo={a.title}
                    descripcion={a.summary}
                    vacantes={a.quota}
                    key={i}
                    get={props.get}
                  />
                );
              })}
            </div>
          </div>
        </div>
    </>
  );
};

export default OfertasInicioUser;
