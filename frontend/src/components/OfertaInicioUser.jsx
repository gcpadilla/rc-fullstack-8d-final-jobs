import React from "react";
import CardPostulation from "./CardPostulation";

const OfertasInicioUser = (props) => {
  return (
    <>
        <div className="OfertasDeTrabajo d-flex flex-column my-5">
          <div className="titulares d-flex d-flex justify-content-center justify-content-md-around">
            <h3 className="titulos col-10">Ofertas de trabajo</h3>
          </div>
          
          <div className="container">
            <div className="d-flex flex-wrap justify-content-sm-center justify-content-md-start">
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
