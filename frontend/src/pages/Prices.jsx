import React from 'react'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import { Button } from 'react-bootstrap'
import Navbar from '../components/Header'
import Footer from '../components/Footer'
import ClassicBan from '../images/prices/classic.svg'
import GoldBan from '../images/prices/gold.svg'
import PremiumBan from '../images/prices/platinum.svg'

import flag from '../images/flag.svg'
import medal from '../images/medal.svg'
import padlog from '../images/padlock.svg'
import key from '../images/llave.svg'

const Prices = () => {
    return (
        <>
        <Navbar />
            <h3 className="text-center my-5">Un Producto para cada Necesidad</h3>
            <CardDeck className="d-flex justify-content-center">
                <Card>
                    <Card.Img variant="top" src={ClassicBan} />
                    <Card.Body>
                        <Card.Title className="tituloCardSale text-center ">Aviso Clásico</Card.Title>
                        <Card.Text className="text-center">
                        La opción más económica para cubrir vacantes.
      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-between align-items-baseline" >
                        <p className="text-center">$4550 + imp</p>
                        <Button variant="info">Contratar</Button>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src={GoldBan} />
                    <Card.Body>
                        <Card.Title className="text-center tituloCardSale">Aviso Gold</Card.Title>
                        <Card.Text className="text-center">
                        Visibilidad privilegiada en listado de avisos.
      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-between align-items-baseline" >
                        <p className="text-center">$8.829 + imp.</p>
                        <Button variant="info">Contratar</Button>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src={PremiumBan} />
                    <Card.Body>
                        <Card.Title className="text-center tituloCardSale">Aviso Platinum</Card.Title>
                        <Card.Text className="text-center">
                        Máximo destaque <br/> Y volumen de candidatos.
      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-between align-items-baseline" >
                        <p className="text-center">$16.879 + imp</p>
                        <Button variant="info">Contratar</Button>
                    </Card.Footer>
                </Card>


            </CardDeck>
            <div className="my-5">
            <h3 className="text-center my-5">¿Por qué Elegirnos?</h3>
        <div className="container">
                <div className="row">
                <div className="col-md-6 col-sm-12 row d-flex align-items-center">
                    <img className="col-2 imagePrice" src={medal} alt="medal"/>
                    <p className="col-10">Ofrecemos una solución simple e integral de reclutamiento</p>
                </div>
                <div className="col-md-6 col-sm-12 row d-flex align-items-center">
                    <img className="col-2" src={flag} alt="flag" />
                    <p className="col-10">Disponemos de herramientas personalizadas para la necesidad de cada cliente. </p>
                </div>
                <div className="col-md-6 col-sm-12 row d-flex align-items-center">
                    <img className="col-2" src={key} alt="key" />
                    <p className="col-10">Contribuimos a la imagen de tu empresa como marca empleadora. </p>
                </div>
                <div className="col-md-6 col-sm-12 row d-flex align-items-center">
                    <img className="col-2" src={padlog} alt="padlog"/>
                    <p className="col-10">Es fácil, seguro y efectivo. </p>
                </div>
            </div>
        </div>
        </div>
        <Footer />
        </>
    )
}

export default Prices