import React, { useState, useEffect, useCallback } from "react";
import CardOfferts from "../components/CardOfferts"
import axios from "axios"


const AdminEditPostulation = (props) => {
    
    const [data, setdata] = useState([]);
    const [cat, setcat] = useState([]);
    const getArticles = useCallback(async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/offers/${props.idpost}/admin`
        );
        setdata(response.data);
        console.log(response.data);
      } catch (error) {
      }
    }, [props.idpost]);
    
    const getAr = useCallback(async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/v1/offers/${props.idpost}/postulations`
        );
        setcat(res.data);
        console.log(res.data);
      } catch (error) {
      }
    }, [props.idpost]);
  
    useEffect(() => {
        getAr();
      }, [getAr]);

  
    useEffect(() => {
      getArticles();
    }, [getArticles]);

    return (
        <div>
            <CardOfferts
        data={data}
        key={data._id}
        sola={true}
      />
    
      <div>
          {/* <table className="table">
            <thead>
                <tr>
                    <th scope="col">Nombre y Apellido</th>
                    <th scope="col">Edad</th>
                    <th scope="col">Documento</th>
                    <th scope="col">CV</th>
                    <th scope="col">Aceptar</th>
                    <th scope="col">Cancelar</th>
                </tr>
                {data.map (cat => {
                    return (
                        <>
                            <td>{cat.name}</td>
                            <td>{cat.age}</td>
                            <td>{cat.document}</td>
                            <td>{cat.cv}</td>
                            <td>{cat.aceptar}</td>
                            <td>{cat.rechazar}</td>

                        </>
                    )
                })}

            </thead>
        </table> */}
      </div>

        </div>
    );
};

export default AdminEditPostulation;