// import React from 'react'
// import '.././App.css'
// import { useState, useEffect, useCallback } from "react";
// import { useParams, Link, useHistory } from 'react-router-dom';
// import axios from "axios"




// const OffersId = () =>{
//     const params = useParams();
//     const history = useHistory();
// const [data, setdata] = useState([]);
    
//   const getArticles = useCallback(async () => {
//     const response = await axios.get(`http://localhost:3001/api/v1/offers/${params.id}`);   
//     setdata(response.data)
// }, [params.id]);


//   useEffect(() => {
//     getArticles();
//   }, [getArticles]);


//     return (
//         <div className="d-flex flex-column align-items-center justify-content-around">
//             <h3>Ver Postulaciones</h3>

    
//         </div>
//     )
// }

// export default OffersId;