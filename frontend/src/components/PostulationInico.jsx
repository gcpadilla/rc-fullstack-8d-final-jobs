import React from "react";

import CardPostulate from "./CardPostulate";

const PostulationInico = (props) => {

  return (
    <>
      <div className="d-flex- align-items-center my-5 generalBody">
        <div className="titulares d-flex justify-content-center justify-content-md-arround my-3">
          <h3 className="titulos col-10">Estas son tus Postulaciones</h3>
        </div>
        <div className="container">
          <div className="d-flex flex-wrap justify-content-center justify-content-md-start ">
            <div className="d-flex justify-content-between flex-wrap">
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
    </>
  );
};

export default PostulationInico;
