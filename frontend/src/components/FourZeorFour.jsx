import React from 'react'
import Header from './Header'
import Footer from './Footer'
import FourZero from '../images/fourZero.svg'


const FourZeroFour = () => {
    return (
        <>
        <Header />
        <div className="container FourZero d-flex align-items-center">
            <div className="row">
                <div className="text col-md-6 col-sm-12 d-flex flex-column justify-content-center">
                <h3 className="tituloNews">¡Aún lo llegamos a eso!</h3>
                <p>Estamos implementando nuevas cosas, mientras tanto, puedes volver ver las principales postulaciones y continuar en la busqueda a tu trabajo soñado</p>
                </div>
                <div className="image col-md-6 col-sm-12">
                    <img className="imgSizeLanding" src={FourZero} alt=""/>
                </div>
            </div>
        </div>
        <Footer />
        </>

    )
}

export default FourZeroFour