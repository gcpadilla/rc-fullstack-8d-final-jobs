import React, { useState, useEffect, useCallback } from "react";
import Footer from "../components/Footer";
import axios from "axios";
import CardOfferts from "../components/CardOfferts";
import FormJobPostulate from "../components/FormJobPostulate";
import EditOffers from "../components/EditOffers";
import { Link } from "react-router-dom";
import auth from "../utils/auth";
import sweetalert from "sweetalert2";
import { useHistory, useParams} from "react-router-dom";
import logo from "../images/RollingJobs.svg";
import profilePH from "../images/profile.jpg";

const PerfilUser = () => {
   
  const [perfil, setperfil] = useState(true);
  const [UserSelec, setUserSelec] = useState({});
  const [candidato, setcandidato] = useState({});
  // const params = useParams();
  
  const onsubmit = async (e) => {
    e.preventDefault()}
    const getArticles = useCallback(async () => {
        const response = await axios.get(
          "http://localhost:3001/api/v1/users/candidates/edit/"
        );
      setcandidato(response.data)
        console.log(response.data);
      }, []);    
      useEffect(() => {
        getArticles();
      }, [getArticles]);

  const onInputChange = (e) => {
    setUserSelec({
      ...UserSelec,
      [e.target.name]: e.target.value,
      publicationdate: new Date().toLocaleString(),
    });
  };
  return (
    <div className=" companyStyle container-fluid">
      <div className="row">
        <nav
          id="sidebarMenu"
          className="col-md-3 col-lg-2 d-inline sidebar collapse sidebarMenu sticky-top "
        >
          <Link to="/">
            <img src={logo} loading="lazy" className="logoStyle mb-3" />
          </Link>

          <div className="sidebar-sticky d-flex flex-column justify-content-around mb-3">
            <h2 className="textAdmin text-dark">Bienvenido usuario</h2>

            <img
              src={profilePH}
              className="profilePH img-fluid mx-auto d-block rounded-circle"
            />

            <ul className="nav flex-column d-flex mt-5">
              <li className="nav-item">
                <Link type="submit" className="text-dark">
                  {" "}
                  Modificar Perfil
                </Link>
              </li>
              <li className="nav-item">
                <Link type="submit" className="text-dark">
                  {" "}
                  Ver Postulaciones
                </Link>
              </li>
              <li className="nav-item">
                <Link type="submit" className="text-dark">
                  {" "}
                  Ofertas Publicadas{" "}
                </Link>
              </li>
            </ul>
            <ul className="nav flex-column d-flex mt-5">
              <li className="nav-item">
                <Link className="mt-auto" type="submit" className="text-dark">
                  {" "}
                  Cerrar Sesión
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className=" col-md-9 col-lg-10 companyData d-flex flex-column flex-wrap">
          <div className=""></div>
          <div className="">
            {perfil ? (
              <div className="container">
                <div className="text-center pb-5 form-group mb-3">
                  <h3 className="mt-4 titulos">Bienvenido</h3>
                  <h5 className="mb-4 texdo">Registro de candidatos</h5>
                  <p className="mb-4 textNews">
                    {" "}
                    Por favor, ingrese sus datos personales para iniciar tu
                    proceso a tu nuevo trabajo.
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
                              className="form-control "
                              name="firstname"
                              defaultValue={candidato.firstname}
                              onChange={onInputChange}
                            />
                          </div>

                          <div className="form-group col-6">
                            <label htmlFor="lastname">Apellido</label>
                            <input
                              type="text"
                              required
                              className="form-control"
                              name="lastname"
                              defaultValue={candidato.lastname}
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
                              className="form-control"
                              name="dni"
                              defaultValue={candidato.dni}
                              onChange={onInputChange}
                            />
                          </div>

                          <div className="form-group col-md-6">
                            <label htmlFor="Age">Fecha de Nacimiento</label>
                            <input
                              type="date"
                              required
                              className="form-control"
                              name="age"
                              defaultValue={candidato.age}
                              onChange={onInputChange}
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="profession">
                              Profesión Principal
                            </label>
                            <input
                              type="text"
                              required
                              className="form-control"
                              name="profession"
                              defaultValue={candidato.profession}
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
                              className="form-control"
                              name="email"
                              aria-describedby="emailHelp"
                              defaultValue={candidato.email}
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
                              className="form-control"
                              name="username"
                              defaultValue={candidato.username}
                              onChange={onInputChange}
                            />
                          </div>

                          <div className="form-group col-md-3">
                            {" "}
                            <label htmlFor="inputPassword5">Contraseña</label>
                            <input
                              type="password"
                              required
                              defaultValue="Contraseña"
                              id="inputPassword5"
                              name=""
                              className="form-control"
                              aria-describedby="passwordHelpBlock"
                              onChange={onInputChange}
                            />
                            <small
                              id="passwordHelpBlock"
                              className="form-text text-muted"
                            >
                              la password debe tener entre 8 y 20 caracteres,
                              contener letras y numeros, tiene que contener por
                              lo menos una mayuscula y una minuscula.
                            </small>
                          </div>
                          <div className="form-group col-md-3">
                            <label htmlFor="exampleInputPassword1">
                              Repita la Contraseña
                            </label>
                            <input
                              type="password"
                              required
                              className="form-control"
                              name="password2"
                              defaultValue=""
                              onChange={onInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <button
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
            ) : (
              <div></div>
            )}

            {<div></div> ? (
              <div></div>
            ) : (
              <div>
                {/* <EditOffers oferta={id} terminar={mostrarcard}/> */}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default PerfilUser;
