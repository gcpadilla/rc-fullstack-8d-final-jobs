import React from 'react'
import '../App.css'
import CartelCategories from './CartelCategories'
import CartelJobs from './CartelJobs'
import searchImage from '../images/search.svg'

const BodyCategories = () => {

    const categories =[
        {imagen: searchImage ,
        Titulo: "Categoría Categoría",
        vancante: 15 },

        {imagen: searchImage ,
        Titulo: "Categoría Categoría",
        vancante: 15 }
    ]
    const jobs = [
        {empresa: "Empresa",
        puesto: "puesto",
        lugar:"lugar",
        modalidad:"Part-Time",
        tiempo: "Hace XX dias",
        imagen: searchImage,
        },
        {empresa: "Empresa",
        puesto: "Puesto Puesto",
        lugar:"lugar",
        modalidad:"Part-Time",
        tiempo: "Hace XX dias",
        imagen: searchImage,
        }
    ]

    return (
        <div className="d-flex- align-items-center mt-5 mb-5">
        <div className="d-flex flex-column align-items-center ">
                <div className="titulares d-flex container align-items-center">
                    <h3 className="titulos col-8">Principales Categorías</h3>
                    <h5 className="links col-2 text-right">Explorar Más</h5>
                </div>
                <div className="distriCards d-flex justify-content-between flex-wrap">
                {categories.map (categ => {
                    return <CartelCategories 
                    imagen={categ.imagen} 
                    tituloCategoria={categ.Titulo} 
                    vacantes={categ.vancante}/>
                })}
                </div>
            
        </div>
            <div className="d-flex flex-column align-items-center">
                <div className="titulares d-flex container align-items-centers">
                    <h3 className="titulos col-8" >Puestos Más Solicitados</h3>
                    <h5 className="links col-2 text-right" >Explorar Más</h5>
                </div>
                <div className="distriCards d-flex flex-wrap justify-content-center">
                {jobs.map (job => {
                    return <CartelJobs 
                    empresa={job.empresa} 
                    puesto={job.puesto} 
                    lugar={job.lugar} 
                    modalidad={job.modalidad}
                    tiempoPublicacion={job.tiempo}
                    logoEmpresa={job.imagen}
                    />
                })}
                </div>
            </div>
            </div>

    )
}

export default BodyCategories