import React from 'react'
import foto1 from '../images/puzzlePeople.svg'
import foto2 from '../images/team.svg'
import Header from '../components/Header'
import Footer from '../components/Footer'

const WeAre = () => {
    return (
        <div>
        <Header />
        <div className="container d-flex flex-wrap generalBody">
        <img src={foto1} alt="" className="col-md-6"/>
        <div className="col-md-6 d-flex flex-column justify-content-center pl-5">
        <h2 className="titulos">Acerca de RollingJobs</h2>

        <p> En RollingJobs ayudamos a las personas a encontrar un trabajo mejor, a crecer profesionalmente y generar relaciones con las empresas que buscan el profesional que mejor encaje con sus necesidades. </p>
        <p> Siempre buscamos lo mejor para los candidatos, permitiendo el acceso libre a miles de empleos, publicar su CV e investigar sobre las empresas.  </p>
        <p> A diario, conectamos a millones de personas con nuevas oportunidades. </p>

        </div>
        </div>

        <div>
        <div className="container d-flex flex-wrap generalBody">
        <div className="col-md-6 d-flex flex-column justify-content-center pr-5">
        <h2 className="titulos" >Nuestra gente </h2>
        <p> Contamos con un gran equipo que se dedica con pasión a mejorar el proceso de reclutamiento mediante el análisis de datos y casos reales.</p>
        <p> Fomentamos un lugar de trabajo de colaboración que nos permite enfocarnos en crear la mejor experiencia para los candidatos en busca de empleo.</p>
        </div>
        <img src={foto2} alt="" className="col-md-6"/>

        </div>
        </div>
        <Footer />
        </div>

        )
}

export default WeAre