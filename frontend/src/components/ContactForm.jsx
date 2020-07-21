import React from "react";
// import Swal from "sweetalert2";
// import axios from "axios";
import image1 from '../images/peopleUno.svg'


const ContactForm = () => {
  // const [UserSelec, setUserSelec] = useState({});

  // const onsubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.put(
  //       `http://localhost:3001/api/v1/offers/${props.oferta._id}`,
  //       UserSelec
  //     );
  //     setUserSelec({});
  //     await Swal.fire(
  //       "genial",
  //       "se modifico correctamente la oferta",
  //       "success"
  //     );
  //     props.terminar();
  //   } catch (err) {
  //     if (err.response.data.message === undefined) {
  //       Swal.fire(
  //         `Error de ${err.response.data.errors[0].param}`,
  //         err.response.data.errors[0].msg,
  //         "error"
  //       );
  //     } else {
  //       Swal.fire("Oops..", err.response.data.message, "error");
  //     }
  //   }
  // };

  // const onInputChange = (e) => {
   
  //   setUserSelec({

  //     ...UserSelec,
  //     [e.target.name]: e.target.value,
  //     publicationdate: new Date().toLocaleString(),
  //   });
  //   console.log(UserSelec);
  // };
  return (
    <div className="container d-flex flex-wrap generalBody">
    <div className="d-flex flex-column align-items-center col-6">
      <h3 className="titulos my-3">Comunicate con Nosotros </h3>

      <form>
        <div className="form-row"> 
        
        
        <div className=" col-md-6 col-sm-12 form-group">
        <label className="formLabel" >Nombre</label>
          <input
            type="text"
            required
            className="form-control "
            name="title"
            // defaultValue={}
            // onChange={onInputChange}
          />
        </div>
        <div className=" col-md-6 col-sm-12 form-group">
        <label className="formLabel" >Correo Electrónico</label>
          <input
            type="email"
            required
            className="form-control "
            name="summary"
            // defaultValue={}
            // onChange={onInputChange}
          />
        </div>
        <div className="col-md-6 col-sm-12 form-group">
        <label className="formLabel" >Descripción</label>
         <textarea
            className="form-control"
            required
            name="description"
            // defaultValue={}
            // onChange={onInputChange}
          />
        </div>

        </div>

      </form>
      <div className="buttonOptions d-flex justify-content-between">
      <button
                // onClick={}
                className="btn btn-danger rounded-pill mr-5"
              >
                Cancelar
              </button>
        <button
          type="submit"
          // onClick={onsubmit}
          // onClick={() => props.crear(true)}
          className="btn btn-success rounded-pill"
        >
          Enviar
        </button>
        {/* <Button className="mr-2" name="Crear oferta" /> */}
        {/* <Button className="mr-2" name="Publicar" /> */}
      </div>
    </div>
    <img src={image1} alt="" className="col-6" />
    </div>
  );
};

export default ContactForm;
