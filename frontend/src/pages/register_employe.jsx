import React from "react";
import moment from "moment";
import axios from "axios";
import Header from '../components/Header'
import Footer from '../components/Footer'
import "../App.css"

import { useState } from "react";

const Register = () => {
  const [UserSelec, setUserSelec] = useState({});

  const onsubmit = async (e) => {
    e.preventDefault();
    console.log(UserSelec);
    console.log(UserSelec.age);
    const anio = edad(UserSelec.age);
    console.log(anio);
    UserSelec.age = anio;

    console.log(UserSelec);


    await axios.post(
      "http://localhost:3001/api/v1/users/candidates",
      UserSelec
     
    );
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
      [e.target.name]: e.target.value, publicationdate: new Date().toLocaleString(),
    });
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="text-center pb-5 form-group mb-3">
          <h1 className="mt-4 titulos">Bienvenido</h1>
          <h4 className="mb-4 texdo">Registro de candidatos</h4>
          <div className="mb-4">
            <form onSubmit={onsubmit}>
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label form="Name">Ingrese su nombre/s</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      name="firstname"
                      placeholder="Name"
                      onChange={onInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label form="username">Ingrese un username</label>
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
                    <label form="Age">Ingrese su fecha de nacimiento</label>
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
                    <label form="profession">Ingrese su profesión</label>
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
                    <label form="dni">ingrese su dni</label>
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

                <div className="col-6">

                <div className="form-group">
                    <label form="lastname">ingrese su apellido</label>
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
                    <label form="exampleInputEmail1">Email address</label>
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
                    <label form="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      required
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      onChange={onInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label form="exampleInputPassword1">
                      Repita la Password
                    </label>
                    <input
                      type="password"
                      required
                      className="form-control"
                      name="public"
                      placeholder="Password"
                      // onChange={onInputChange}
                    />
                  </div>

                </div>
              </div>
              <button type="submit" className="btn btn-primary ">
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
