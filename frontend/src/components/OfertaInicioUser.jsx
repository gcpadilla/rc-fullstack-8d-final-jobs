import React from "react";
import CardPostulation from "./CardPostulation";

const OfertasInicioUser = (props) => {
  return (
    <>
      <div className="d-flex justify-content-md-start justify-content-sm-start  flex-column my-5">
        <div className="titulares d-flex d-flex justify-content-center justify-content-md-around">
          <h3 className="postulationInicio titulos col-10">
            Ofertas de trabajo
          </h3>
        </div>

        <div className="d-flex flex-column flex-wrap align-items-center my-5 ">
          <div className="container">
            <div className="d-flex flex-wrap justify-content-sm-center justify-content-md-start ml-4">
              {props.datauser.message !== "No hay ofertas disponibles . . ." ? (
                <>
                  {" "}
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
                  })}{" "}
                </>
              ) : (
                <h3> NO HAY OFERTAS CREADAS</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfertasInicioUser;
