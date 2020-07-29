import React, { useState, useEffect, useCallback } from "react";
import CardOfferts from "../components/CardOfferts";
import axios from "axios";
import Tabla from "../components/Tabla"

const AdminEditPostulation = (props) => {
  const [data, setdata] = useState([]);
  const [cat, setcat] = useState({ postulateRef: [] });
  const getArticles = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/v1/offers/${props.idpost}/admin`
      );
      setdata(response.data);
    } catch (error) {}
  }, [props.idpost]);

  const getAr = useCallback(async () => {
    try {
      const res = await axios.get(
        `/api/v1/offers/${props.idpost}/postulations`
      );
      setcat(res.data);
    } catch (error) {}
  }, [props.idpost]);

  useEffect(() => {
    getAr();
  }, [getAr]);

  useEffect(() => {
    getArticles();
  }, [getArticles]);
  

  return (
    <div>
      <div className="d-flex flex-nowrap justify-content-center">
      <CardOfferts data={data} key={data._id} sola={true} />
      </div>
      <div>
        {cat.postulateRef.length > 0 ? (
          <div className="table-responsive ">
            <table className="table table-striped table-sm table-dark">
              <thead>
                <tr>
                <th className="tablaTitulo" scope="col">CV</th>
                  <th className="tablaTitulo" scope="col">Candidato</th>
                  <th className="tablaTitulo" scope="col">Email</th>
                  <th className="tablaTitulo" scope="col">Experiencia</th>
                  <th className="tablaTitulo" scope="col">Salario pretendido</th>
                  <th className="tablaTitulo" scope="col">Estudios</th>
                  <th className="tablaTitulo" scope="col">Estado</th>
                </tr>
                {cat.postulateRef.map((c,i) => {
                  return (
                    <Tabla c={c} d={cat.candidateRef[i]} key={c._id}/>
                  );
                })}
              </thead>
            </table>
          </div>
        ) : (
          <h2 className="text-center mt-5" >Aun no presenta postulaciones!</h2>
        )}
      </div>
    </div>
  );
};

export default AdminEditPostulation;

