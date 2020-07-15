import React, { useState, useEffect, useCallback } from "react";
import CardPostulation from "./CardPostulation";
import axios from "axios";

const OfertasInicioUser = (props) => {
  return (
    <div className="d-flex- align-items-center my-5 generalBody">
      <div className="d-flex flex-column align-items-center my-5 ">
        <div className="titulares d-flex container align-items-center">
          <h3 className="titulos col-10">Ofertas de trabajo</h3>
        </div>
        <div className="container">
          <div className="distriCards d-flex  flex-wrap">
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
    </div>
  );
};

export default OfertasInicioUser;
