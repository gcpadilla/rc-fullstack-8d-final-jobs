import React from "react";
import Header from '../components/Header'

const FaqBusiness = () => {
  const faqs = [
    {
      pregunta: "¿Cómo funciona RollingJobs?",
      respuesta:
        "RollingJobs actúa como conector entre personas y empresas. A través del sitio,  los candidatos se postulan a los avisos enviando su currículum. Para tener acceso a publicar avisos laborales, sólo necesitas registrar tu empresa ingresando número de CUIT, Razón Social y Nombre Comercial.",
    },
    {
      pregunta: "¿RollingJobs interfiere en el proceso de selección?",
      respuesta:
        "En nuestro sitio publicamos los avisos de trabajo y los candidatos interesados en postularse a estas vacantes se postulan para una posterior entrevista, situación que RollingJobs no interfiere en ningún momento en el proceso de selección de los candidatos.",
    },
    {
      pregunta: "¿Cuánto tardan los avisos en aparecer en la web?",
      respuesta:
        "Todos los avisos son revisados por nuestro equipo editorial en un periodo máximo de 24 a 48 horas laborables, siempre de lunes a viernes. Los avisos de empresas con servicio de membresía se publican automáticamente y se revisan a posteriori."
        ,
    },
    {
      pregunta: "¿Cuales son los estados de los empleos?",
      respuesta:
        "Los avisos Inactivos no aparecen en la web, sin embargo, es posible consultar su información. <br/> Los avisos con estatus Activado son los que están disponibles para la postulación de candidatos. Todas las nuevas postulaciones se publican con este estado."
        ,
    },

    {
      pregunta: "¿Existen restricciones para publicar avisos de trabajo dentro de RollingJobs?",
      respuesta:
        "En RollingJobs no está permitido publicar avisos de empleo para expandir negocios multinivel o piramidales, ni avisos encaminados a trabajar directamente con una aplicación móvil. Tampoco se permite publicar anuncios de empleo que sirvan para distribuir, publicitar o promocionar productos o servicios específicos. Estos anuncios serán eliminados del portal antes de que se publiquen."
        ,
    },
    {
      pregunta: "¿Cómo puedo modificar los datos de mi empresa?",
      respuesta:
        "Para modificar datos de tu empresa tenés que acceder a la pestaña de Configuración en tu área de empresa. Desde allí puedes cambiar los datos de acceso como el e-mail y la contraseña y también editar la información sobre tu empresa. "
        ,
    },


  ];
  return (
    <section>
    <Header />
    <div className="p-5">
        <h3 className="titulos text-center">Preguntas Frecuentes</h3>
        {faqs.map ((ques,i) =>  {
            return      <div className="p-3"  key={i} >
                <h3 className="titulosQues">{ques.pregunta}</h3>
            <p className="card-text">{ques.respuesta} </p>
      </div>
        })}
    </div>
    </section>
  );
};

export default FaqBusiness;
