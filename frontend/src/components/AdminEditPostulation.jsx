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
        `http://localhost:3001/api/v1/offers/${props.idpost}/admin`
      );
      setdata(response.data);
    } catch (error) {}
  }, [props.idpost]);

  const getAr = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/v1/offers/${props.idpost}/postulations`
      );
      setcat(res.data);
      console.log(res.data);
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
      <CardOfferts data={data} key={data._id} sola={true} />

      <div>
        {cat.postulateRef.length > 0 ? (
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Nombre y Apellido</th>
                  <th scope="col">Email</th>
                  <th scope="col">Experiencia</th>
                  <th scope="col">Salario pretendido</th>
                  <th scope="col">Estudios</th>
                  <th scope="col">Estado</th>
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
