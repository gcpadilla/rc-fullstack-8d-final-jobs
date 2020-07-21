import React from 'react'
import CartelInfo from './CartelInfo'
// import imagenUno from '../images/peopleUno.svg'
import '../App.css'

const Body = () => {

    const titulos = [
        {Titulo: "+1500",
        Subtitulo: "suscriptores al newsletter"
        },
        {Titulo: "60",
        Subtitulo: "aplicantes preparados"
        },
        {Titulo: "1",
        Subtitulo: "equipo para ayudarte :)"
        }
    ]

    return (
        <div className="generalBody d-flex justify-content-center container">
            <div className="izquierdaBody d-flex flex-column align-items-center justify-content-around">
                {/* <Search /> */}
                <p className=" tituloCartel text-center mt-5">En RollingJobs creemos en la acción <br /> de conectar a las personas <br /> con su trabajo ideal. </p>  
                {/* <Button name="¿Buscás al Candidato?" /> */}
                    <div className="d-flex flex-row flex-wrap justify-content-around align-items-start m-3">
                        {titulos.map (nombre => {
                            
                            return <CartelInfo Titulo={nombre.Titulo} Subtitulo={nombre.Subtitulo} key={nombre.Titulo} className />
                        })}
                    </div>
                {/* <Button name="Publicar Ahora" />        */}
            </div>
        </div>
    )
}

export default Body