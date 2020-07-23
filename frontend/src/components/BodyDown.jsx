import React from 'react'
import '../App.css'
import Team from '../images/team.svg'
import FormSuscription from '../components/FormSuscrip' 

const BodyDown = () => {

    return (
        <>
        <div className="generalBody d-flex flex-wrap justify-content-center align-items-center container-fluid">
            <div className="col-sm-12 col-md-4 d-flex flex-column">
                <h3 className="tituloDown text-center">Trabajamos Juntos</h3>
                <p className="textDown text-center">Para gestionar como equipo <br /> tu futuro soñado </p>  
            </div>
                <div className="col-sm-12 col-md-6 d-flex justify-content-center">
                <img src={Team} alt="Team" className="imgSizeLanding" />
                </div>
        </div>
        <div>
        <div className="mt-5 d-flex flex-column align-items-center testingMargin">
                <h3 className="tituloNews text-center">Suscríbite al Newsletter</h3>
                <p className="textNews text-center"> Trabajos - Talleres - Novedades - Información Util </p>  
            <FormSuscription />
            </div>
        </div>
        </>
    )
}

export default BodyDown