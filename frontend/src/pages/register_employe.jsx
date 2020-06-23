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
          "http://localhost:3001/api/v1/users/candidates",
          UserSelec
        );
        setTimeout(() => {
          setredirec(true);
        }, 1000);

        Swal.fire("genial", "se registro sactifactoriamente!", "success");
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
    console.log(anios);
    return anios;
  };

  const onInputChange = (e) => {
    setUserSelec({
      ...UserSelec,
      [e.target.name]: e.target.value,
      publicationdate: new Date().toLocaleString(),
    });
  };

  return (
    <div>
      {console.log(redirec)}
      {redirec && <Redirect to="/" />}
      <Header />
      <div className="container">
        <div className="text-center pb-5 form-group mb-3">
          <h1 className="mt-4 titulos">Bienvenido</h1>
          <h4 className="mb-4 texdo">Registro de candidatos</h4>
          <div className="mb-4">
            <form onSubmit={onsubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="Name">Ingrese su nombre/s</label>
                    <input
                      type="text"
                      required
                      className="form-control "
                      name="firstname"
                      placeholder="Name"
                      onChange={onInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="username">Ingrese un username</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      name="username"
                      placeholder="username"
                      onChange={onInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="Age">Ingrese su fecha de nacimiento</label>
                    <input
                      type="date"
                      required
                      className="form-control"
                      name="age"
                      placeholder="Age"
                      onChange={onInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="profession">Ingrese su profesión</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      name="profession"
                      placeholder="profession"
                      onChange={onInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="dni">ingrese su dni</label>
                    <input
                      type="number"
                      required
                      className="form-control"
                      name="dni"
                      placeholder="dni"
                      onChange={onInputChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="lastname">ingrese su apellido</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      name="lastname"
                      placeholder="lastname"
                      onChange={onInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      required
                      className="form-control"
                      name="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      onChange={onInputChange}
                    />
                  </div>

                  <div className="form-group">
                    {" "}
                    <label htmlFor="inputPassword5">Password</label>
                    <input
                      type="password"
                      required
                      placeholder="Password"
                      id="inputPassword5"
                      name="password"
                      className="form-control"
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

                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">
                      Repita la Password
                    </label>
                    <input
                      type="password"
                      required
                      className="form-control"
                      name="password2"
                      placeholder="Password"
                      onChange={onInputChange}
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-success rounded-pill">
                Guardar
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
