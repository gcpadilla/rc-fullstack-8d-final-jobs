import React from "react";

import CardPostulate from "./CardPostulate";

const PostulationInico = (props) => {

  return (
      <div className="d-flex justify-content-md-start justify-content-sm-start  flex-column my-5">
        <div className="titulares d-flex d-flex justify-content-center justify-content-md-around">
          <h3 className=" postulationInicio titulos col-10">Estas son tus Postulaciones</h3>
        </div>
        <div className="d-flex flex-column flex-wrap align-items-center my-5 ">
          <div className="container">
            <div className="d-flex flex-wrap justify-content-sm-center justify-content-md-start ml-4">
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
        </div >
      </div>
  );
};

export default PostulationInico;
