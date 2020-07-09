// import React from 'react'
// import '../App.css'
// import CartelCategories from './CartelCategories'
// import CartelJobs from './CartelJobs'
// import searchImage from '../images/search.svg'
// import {Link} from 'react-router-dom'

// const BodyCategories = () => {

//     const categories =[
//         {imagen: searchImage ,
//         Titulo: "Categoría Categoría",
//         vancante: 14 },

//         {imagen: searchImage ,
//         Titulo: "Categoría Categoría",
//         vancante: 15 }
//     ]
//     const jobs = [
//         {empresa: "Empresa",
//         puesto: "puesto",
//         lugar:"lugar",
//         modalidad:"Part-Time",
//         tiempo: "Hace XX dias",
//         imagen: searchImage,
//         },
//         {empresa: "Empresa",
//         puesto: "Puesto Puesto",
//         lugar:"lugar",
//         modalidad:"Part-Time",
//         tiempo: "Hace XI dias",
//         imagen: searchImage,
//         }
//     ]

//     return (
//         <div className="d-flex- align-items-center my-5 generalBody">
//         <div className="d-flex flex-column align-items-center my-5 ">
//                 <div className="titulares d-flex container align-items-center">
//                     <h3 className="titulos col-10">Principales Categorías</h3>
//                     {/* <Link className="links col-2 text-right">Explorar Más</Link> */}
//                 </div>
//                 <div className="distriCards d-flex justify-content-between flex-wrap">
//                 {categories.map (categ => {
//                     return <CartelCategories 
//                     imagen={categ.imagen} 
//                     tituloCategoria={categ.Titulo} 
//                     vacantes={categ.vancante}
//                     key={categ.vancan}
//                     />
                    
//                 })}
//                 </div>
            
//         </div>
//             <div className="d-flex flex-column align-items-center my-5">
//                 <div className="titulares d-flex container align-items-centers">
//                     <h3 className="titulos col-10" >Puestos Más Solicitados</h3>
//                     {/* <Link className="links col-2 text-right">Explorar Más</Link>    */}
//                                  </div>
//                 <div className="distriCards d-flex flex-wrap justify-content-center">
//                 {jobs.map (job => {
//                     return <CartelJobs 
//                     empresa={job.empresa} 
//                     puesto={job.puesto} 
//                     lugar={job.lugar} 
//                     modalidad={job.modalidad}
//                     tiempoPublicacion={job.tiempo}
//                     logoEmpresa={job.imagen}
//                     key={job.tiempo}
//                     />
//                 })}
//                 </div>
//             </div>
//             </div>

//     )
// }

// export default BodyCategories