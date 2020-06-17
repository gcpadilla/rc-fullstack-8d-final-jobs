import React from 'react'
import '../App.css'
import Team from '../images/team.svg'
import Newsletter from '../components/Search' 

const BodyDown = () => {

    return (
        <>
        <div className=" d-flex justify-content-center ">
            <div className="col-4 d-flex flex-column justify-content-center align-items-end">
                <h3 className="tituloDown">Trabajamos Juntos</h3>
                <p className="textDown text-right">Para gestionar como equipo <br /> tu futuro soñado </p>  
            </div>
            <div className=" ml-5 col-6 h-100 d-flex align-items-end">
                <img src={Team} alt="Team" className=""/>
            </div>
        </div>
        <div>
        <div className="mt-5 d-flex flex-column align-items-center mt-5 mb-5">
                <h3 className="tituloNews">Suscríbite al Newsletter</h3>
                <p className="textNews text-center"> Trabajos - Talleres - Novedades - Información Util </p>  
            <Newsletter />
            </div>
        </div>
        </>
    )
}

export default BodyDown