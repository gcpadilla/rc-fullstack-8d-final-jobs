import React, { useState, useEffect, useCallback } from "react";
import "../App.css";
import CartelCategories from "./CartelCategories";
import axios from "axios";
// import searchImage from "../images/search.svg";
// import { Link } from "react-router-dom";

const OfertasInicio= (props) => {
  const [data, setdata] = useState([]);
  const getArticles = useCallback(async () => {
    try {
      const response = await axios.get(
        "/api/v1/offers/all"
      );
      setdata(response.data);      
    } catch (error) {
    }
  }, []);

  useEffect(() => {
    getArticles();
  }, [getArticles]);
  return (
      <div className="OfertasDeTrabajo1 d-flex flex-column align-items-center my-5">
        <div className="titulares d-flex justify-content-center justify-content-md-around ">
          <h3 className="infoCard mb-5">Ofertas de trabajo</h3>
        </div>
        <div className="d-flex flex-wrap justify-content-center justify-content-md-start">
          {data.map((a,i) => {
            return (
              <CartelCategories
                titulo={a.title}
                descripcion={a.summary}
                vacantes={a.quota}
                key={i}
              />
            );
          })}
        </div>
      </div>
  );
};

export default OfertasInicio;
