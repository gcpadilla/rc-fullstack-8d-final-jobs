import React, { useState, useEffect, useCallback } from "react";

import CardPostulate from "./CardPostulate";

const PostulationInico = (props) => {

  return (
    <div className="d-flex- align-items-center my-5 generalBody">
      <div className="d-flex flex-column align-items-center my-5 ">
        <div className="titulares d-flex container align-items-center">
          <h3 className="titulos col-10">Estas son tus Postulaciones</h3>
        </div>
        <div className="distriCards d-flex justify-content-between flex-wrap">
          {props.datapostulation.map((a, i) => {
            return (
              <CardPostulate
                all={a}
                key={i}
             get={props.get}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostulationInico;
