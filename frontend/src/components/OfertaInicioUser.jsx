import React, { useState, useEffect, useCallback } from "react";
import "../App.css";
import CardPostulation from "./CardPostulation";
import axios from "axios";

const OfertasInicioUser= () => {
  const [data, setdata] = useState([]);
  const getArticles = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/offers/candidate/all"
      );
      setdata(response.data);
      console.log(response.data.length);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getArticles();
  }, [getArticles]);
  return (
    <div className="d-flex- align-items-center my-5 generalBody">
      <div className="d-flex flex-column align-items-center my-5 ">
        <div className="titulares d-flex container align-items-center">
          <h3 className="titulos col-10">Ofertas de trabajo</h3>
        </div>
        <div className="container">

        <div className="distriCards d-flex  flex-wrap">
          {data.map((a,i) => {
            return (
              <CardPostulation all={a}
                titulo={a.title}
                descripcion={a.summary}
                vacantes={a.quota}
                key={i}
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
