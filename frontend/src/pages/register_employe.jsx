import React from "react";
import moment from "moment";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../App.css";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [UserSelec, setUserSelec] = useState({});
  const [redirec, setredirec] = useState(false);

  const onsubmit = async (e) => {
    e.preventDefault();
    const anio = edad(UserSelec.age);
    UserSelec.age = anio;
    if (UserSelec.password === UserSelec.password2) {
      try {
        await axios.post(
          "/api/v1/users/candidates",
          UserSelec
        );
        await Swal.fire({
          icon: "success",
          title: "se registro sactifactoriamente!",
          showConfirmButton: false,
          width: "auto",
          timer: 1500,
        });
        // await Swal.fire("genial", "se registro sactifactoriamente!", "success");
        setredirec(true);
      } catch (err) {
        if (err.response.data.message === undefined) {
          Swal.fire(
            `Error de ${err.response.data.errors[0].param}`,
            err.response.data.errors[0].msg,
            "error"
          );
        } else {
          Swal.fire("Oops..", err.response.data.message, "error");
        }
      }
    } else if (UserSelec.password !== UserSelec.password2) {
      Swal.fire("Error de Password", "las contraseñas no son iguales", "error");
    }
  };
  const edad = (a) => {
    const nacimiento = moment(a);
    const hoy = moment();
    const anios = hoy.diff(nacimiento, "years");
    return anios;
  };

  const onInputChange = (e) => {
    if (e.target.name === "age") {
      setUserSelec({
        ...UserSelec,
        [e.target.name]: e.target.value,
        publicationdate: new Date().toLocaleString(),
        dateborn: e.target.value,
      });
    } else {
      setUserSelec({
        ...UserSelec,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div>
      {redirec && <Redirect to="/" />}
      <Header />
      <div className="container">
        <div className="text-center pb-5 form-group mb-3">
          <h3 className="mt-4 titulos">Bienvenido</h3>
          <h5 className="mb-4 texdo">Registro de candidatos</h5>
          <p className="mb-4 textNews">
            {" "}
            Por favor, ingrese sus datos personales para iniciar tu proceso a tu
            nuevo trabajo.
          </p>
          <div className="mb-4">
            <form onSubmit={onsubmit}>
              <div className="form-group">
                <div className=" form-row ">
                  <div className="form-group col-6">
                    <label htmlFor="Name">Nombre</label>
                    <input
                      type="text"
                      required
                      className="form-control form-control-sm "
                      name="firstname"
                      placeholder="Nombre"
                      onChange={onInputChange}
                      autoFocus
                    />
                  </div>

                  <div className="form-group col-6">
                    <label htmlFor="lastname">Apellido</label>
                    <input
                      type="text"
                      required
                      className="form-control form-control-sm"
                      name="lastname"
                      placeholder="Apellido"
                      onChange={onInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="dni">Documento</label>
                    <input
                      type="number"
                      required
                      className="form-control form-control-sm"
                      min="100000"
                      max="999999999"
                      name="dni"
                      placeholder="DNI / Cedula de Identidad / Pasaporte"
                      onChange={onInputChange}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="Age">Fecha de Nacimiento</label>
                    <input
                      type="date"
                      required
                      className="form-control form-control-sm"
                      name="age"
                      placeholder="Fecha de Nacimiento"
                      onChange={onInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="profession">Profesión Principal</label>
                    <input
                      type="text"
                      required
                      className="form-control form-control-sm"
                      name="profession"
                      placeholder="Profesión"
                      onChange={onInputChange}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="exampleInputEmail1">
                      Correo Elctrónico
                    </label>
                    <input
                      type="email"
                      required
                      className="form-control form-control-sm"
                      name="email"
                      aria-describedby="emailHelp"
                      placeholder="Correo Elctrónico"
                      onChange={onInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="username">Nombre de Usuario</label>
                    <input
                      type="text"
                      required
                      className="form-control form-control-sm"
                      name="username"
                      placeholder="Nombre de Usuario"
                      onChange={onInputChange}
                    />
                  </div>

                  <div className="form-group col-md-3">
                    {" "}
                    <label htmlFor="inputPassword5">Contraseña</label>
                    <input
                      type="password"
                      required
                      minLength="8"
                      placeholder="Contraseña"
                      id="inputPassword5"
                      name="password"
                      className="form-control form-control-sm"
                      aria-describedby="passwordHelpBlock"
                      onChange={onInputChange}
                    />
                    <small
                      id="passwordHelpBlock"
                      className="form-text text-muted"
                    >
                      la password debe tener entre 8 y 20 caracteres, contener
                      letras y numeros, tiene que contener por lo menos una
                      mayuscula y una minuscula.
                    </small>
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="exampleInputPassword1">
                      Repita la Contraseña
                    </label>
                    <input
                      type="password"
                      required
                      minLength="8"
                      className="form-control form-control-sm"
                      name="password2"
                      placeholder="Contraseña"
                      onChange={onInputChange}
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={setredirec}
                className="btn btn-danger rounded-pill mr-5"
              >
                Cancelar
              </button>
              <button
                type="submit"
                onSubmit={onsubmit}
                className="btn btn-success rounded-pill"
              >
                Confirmar Registro
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
