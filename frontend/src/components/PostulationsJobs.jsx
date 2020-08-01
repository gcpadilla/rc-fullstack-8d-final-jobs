import React from 'react'
import '.././App.css'
import { useState, useEffect, useCallback } from "react";
import axios from "axios"
import CardOfferts from './CardOfferts';



const PostulationsJobs = () =>{
const [data, setdata] = useState([]);
    
  const getArticles = useCallback(async () => {
    const response = await axios.get("/api/v1/offers/admin/all");   
    setdata(response.data)
}, []);


  useEffect(() => {
    getArticles();
  }, [getArticles]);

 
    const cartel = data.map( (n,i) => (
        <CardOfferts data={n} key={i}/>
      ));

    return (
        <div className="d-flex flex-column align-items-center justify-content-around">
            <h3>Ver Postulaciones</h3>
            {cartel}
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
    )
}

export default PostulationsJobs