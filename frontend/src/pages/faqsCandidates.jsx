import React from "react";
import Header from '../components/Header'
const FaqsCandidates = () => {
  
  const faqs = [
    {
      pregunta: "Olvidé mi contraseña, ¿cómo puedo acceder?",
      respuesta:
        "Si has olvidado tu contraseña de acceso podés solicitar un recordatorio haciendo click acá.",
    },
    {
      pregunta: "¿Cómo me puedo postular a los avisos de empleo?",
      respuesta:
        "Para postularte a los avisos tenés que tener una cuenta creada postularte a la posición deseada. Si todavía no tenés una cuenta creada podés registrarte acá.",
    },
    {
      pregunta: "¿Cuántas veces puedo postularme al mismo aviso?",
      respuesta:
        "Solo se puede postular una vez a cada aviso. No podrás postularte nuevamente a una oferta, aunque elimines la postulación anterior y tampoco es posible recuperarlas, por lo que te sugerimos estar completamente seguro antes de abandonar una postulación.",
    },
    {
      pregunta: "¿De qué manera las empresas pueden contactar conmigo?",
      respuesta:
        "Las empresas pueden contactar contigo utilizando los datos de contacto que dejaste al registrarte. Te sugerimos que introduzcas información correcta, esto te ayudará a ser contactado con mayor facilidad",
    },
    {
      pregunta: "¿Puedo eliminar mi candidatura de una oferta?",
      respuesta:
        "Si te has postulado a una oferta pero prefieres eliminar tu candidatura lo podés hacer desde la sección Mis Postulaciones. Desde este listado tenés la opción de eliminar tu candidatura de un aviso en concreto. Recuerda que si abandonás una candidatura, no podrás volver a postularse al mismo aviso.",
    },
    {
      pregunta: "¿Cómo puedo cambiar mis datos de acceso??",
      respuesta:
        "Podés modificar los datos de acceso desde el panel de Usuario dentro de tu cuenta.",
    },
  ];
  return (
    <>
    <Header />
    <div className="p-5">
        <h3 className="titulos text-center">Preguntas Frecuentes</h3>
        {faqs.map ((ques, i) =>  {
            return      <div className="p-3" key={i}>
                <h1 className="titulosQues">{ques.pregunta}</h1>
            <p className="card-text">{ques.respuesta} </p>
      </div>
        })}
    </div>
    </>
  );
};

export default FaqsCandidates;
