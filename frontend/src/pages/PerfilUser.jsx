import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { MdLocalOffer } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

import { BsFilePost } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import auth from "../utils/auth";
import logo from "../images/RollingJobswhite.svg";
import sombra from "../images/sombra4.png"
// import profilePH from "../images/profile.jpg";
import PostulationInicio from "../components/PostulationInico";
import OfertaInicioUser from "../components/OfertaInicioUser";
import { AiOutlineEdit, AiFillFilePdf } from "react-icons/ai";

const PerfilUser = () => {
  const [display, setdisplay] = useState(1);
  const [UserSelec, setUserSelec] = useState({});
  const [datapostulation, setdatapostulation] = useState([]);
  const [datauser, setdatauser] = useState([]);
  // const [file, setfile] = useState(null);
  const history = useHistory();

  // TRAE LOS DATOS DE LAS OFERTAS Y POSTULACIONES
  const actualizar = () => {
    getpostulation();
    getuser();
  };
  const getuser = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/offers/candidate/all"
      );
      setdatauser(response.data);
    } catch (error) {
      setdatauser([]);
    }
  }, []);

  const getpostulation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/offer/postulates/user/all"
      );
      setdatapostulation(response.data);
    } catch (error) {
      // console.log("no tiene postulaciones");
      setdatapostulation([]);
    }
  };

  // FUNCIONES DEL FORMULARIO
  const onsubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Esta seguro?",
      text: "Desea modificar los datos?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, modificar!",
    }).then(async (result) => {
      if (result.value) {
        try {
          await axios.put(
            "http://localhost:3001/api/v1/users/candidates/",
            UserSelec
          );
          Swal.fire({
            icon: "success",
            text: "modificado correctamente...",
            width: 250,
            showConfirmButton: false,
            timer: 2000,
          });
          // setUserSelec({});
          // setdisplay(1)
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
      }
    });
  };
  const onInputChange = (e) => {
    setUserSelec({
      ...UserSelec,
      [e.target.name]: e.target.value,
      publicationdate: new Date().toLocaleString(),
    });
  };

  // TRAE LOS DATOS DEL USUARIO PARA SER EDITADOS
  const getArticles = useCallback(async () => {
    const response = await axios.get(
      "http://localhost:3001/api/v1/users/candidates/edit/"
    );
    setUserSelec(response.data);
    // console.log(response.data.imageUrl);
  }, []);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  // CERRAR SESION
  const signOutHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.get("http://localhost:3001/api/v1/users/candidates/logout");
      auth.logout();
      await Swal.fire({
        icon: 'success',
        title:  "sesion cerrada",
        showConfirmButton: false,
        width: 250,
        timer: 1000  
      })
      // await Swal.fire("", "sesion cerrada", "success");
      history.push("/");
    } catch (error) {
      Swal.fire("ERROR", "error de deslogueo", "error");
    }
  };

  //FUNCIONES PARA CARGAR IMAGEN Y GUARDARLA
  const cargarImagen = (e) => {
    guardarImage(e.target.files[0]);
  };

  const guardarImage = async (f) => {
    try {
      if (f !== null) {
        const formData = new FormData();
        formData.append("image", f);
        await axios.post(
          "http://localhost:3001/api/v1/users/candidates/upImagen",
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );
      }
      getArticles();
      Swal.fire({
        icon: "success",
        text: "se cargo la imagen",
        width: 250,
        showConfirmButton: false,
        timer: 1000,
      });
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
  };

  //FUNCIONES PARA CARGAR Y GUARDAR CV
  const cargarCv = (e) => {
    console.log(e.target);
    guardarCv(e.target.files[0]);
  };

  const guardarCv = async (f) => {
    try {
      if (f !== null) {
        const formData = new FormData();
        formData.append("CV", f);
        await axios.post(
          "http://localhost:3001/api/v1/users/candidates/upCv",
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );
      }
      Swal.fire({
        icon: "success",
        text: "Se guardo correctamente su curriculum vitae",
        width: 250,
        showConfirmButton: false,
        timer: 1000,
      });
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
  };
  console.log(UserSelec);

  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <div className=" col-12 col-sm-3 col-md-3 col-lg-2 sidebarMenuAdmin">
            <div>
              <div>
                <Link to="/">
                  <img
                    src={logo}
                    alt="logo"
                    loading="lazy"
                    className="logoStyle  mb-3"
                  />
                </Link>
              </div>

              <div className="d-none d-sm-block mt-4">
                <h2 className="text-white font-weight-bold text-center">
                  Bienvenido {UserSelec.username}
                </h2>
              </div>
              <div className="d-none d-sm-block">
               { UserSelec.imageUrl !== undefined ? (
                <img
                  src={"http://localhost:3001" + UserSelec.imageUrl}
                  alt="logo"
                  className="mx-auto rounded-circle"
                  style={{ width: "150px" }}
                />):(<img
                  src={sombra}
                  alt="logo"
                  className="mx-auto rounded-circle"
                  style={{ width: "150px" }}
                />)}

                <form onSubmit={guardarImage}>
                  <div className="imgPerfil mt-2 ml-3 text-white">
                    <label htmlFor="file_input_id">
                      <AiOutlineEdit /> Foto de perfil
                    </label>
                    <input
                      type="file"
                      id="file_input_id"
                      onChange={cargarImagen}
                      accept="image/png, .jpg, image/gif"
                    />
                  </div>
                </form>
              </div>
              <div className="d-flex flex-sm-column">
                <button
                  onClick={() => {
                    setdisplay(0);
                    actualizar();
                  }}
                  className="text-white text-left btn btn-link"
                >
                  {" "}
                  <FaRegEdit /> Editar Perfil
                </button>
                <button
                  onClick={() => {
                    setdisplay(2);
                    actualizar();
                  }}
                  className="text-white text-left btn btn-link"
                >
                  {" "}
                  <BsFilePost /> Postulaciones
                </button>
                <button
                  onClick={() => {
                    setdisplay(3);
                    actualizar();
                  }}
                  className="text-white text-left btn btn-link"
                >
                  {" "}
                  <MdLocalOffer /> Ofertas{" "}
                </button>
                  <div className="imgPerfil ">
                <form onSubmit={guardarCv}>
                    <label htmlFor="cv_input_id"  className="text-white text-left btn btn-link">
                      <AiFillFilePdf /> Añadir CV
                    </label>
                    <input
                     
                      type="file"
                      id="cv_input_id"
                      onChange={cargarCv}
                      accept=".doc, .docx,.pdf"
                      />
                      </form>
                  </div>
                <button
                  onClick={signOutHandler}
                  className="text-white text-left btn btn-link mt-auto"
                >
                  {" "}
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>

          <div
            className="col-12 col-sm-9 col-md-9 col-lg-10"
            style={{ height: "100vh" }}
          >
            <div>
              {display === 0 ? (
                <div className="container">
                  <div className="text-center pb-5 form-group mb-3">
                    <h3 className="mt-4 titulos">Bienvenido</h3>
                    <h5 className="mb-4 texdo">Registro de Candidato</h5>
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
                                defaultValue={UserSelec.firstname}
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
                                defaultValue={UserSelec.lastname}
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
                                defaultValue={UserSelec.dni}
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
                                defaultValue={UserSelec.profession}
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
                                defaultValue={UserSelec.email}
                                onChange={onInputChange}
                              />
                            </div>
                          </div>

                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <label htmlFor="username">
                                Nombre de Usuario
                              </label>
                              <input
                                type="text"
                                required
                                className="form-control"
                                name="username"
                                defaultValue={UserSelec.username}
                                onChange={onInputChange}
                              />
                            </div>

                            <div className="form-group col-md-3">
                              {" "}
                              <label htmlFor="inputPassword5">Contraseña</label>
                              <input
                                type="password"
                                required
                                defaultValue=""
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
                                la password debe tener entre 8 y 20 caracteres,
                                contener letras y numeros, tiene que contener
                                por lo menos una mayuscula y una minuscula.
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
                          type="submit"
                          onSubmit={onsubmit}
                          className="btn btn-success rounded-pill"
                        >
                          Modificar Registro
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}

              {display === 1 ? (
                <div className="container">
                  <div className="text-center pb-5 form-group mb-3">
                    <h3 className="mt-4 titulos">Bienvenido</h3>
                    <h5 className="mb-4 texdo">Registro de Candidato</h5>
                    <p className="mb-4 textNews">
                      {" "}
                      Por favor, controle sus datos personales para iniciar el
                      proceso de postulación
                    </p>
                    <div className="card">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item align-content-start">
                          NOMBRE: {UserSelec.firstname}
                        </li>
                        <li className="list-group-item">
                          APELLIDO: {UserSelec.lastname}
                        </li>
                        <li className="list-group-item">
                          USERNAME: {UserSelec.username}
                        </li>
                        <li className="list-group-item">
                          Profesión: {UserSelec.profession}
                        </li>
                        <li className="list-group-item">
                          EMAIL: {UserSelec.email}
                        </li>
                        <li className="list-group-item">
                          DNI: {UserSelec.dni}
                        </li>
                        <li className="list-group-item">
                          EDAD: {UserSelec.age}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
              {display === 2 ? (
                <div>
                  <PostulationInicio
                    get={actualizar}
                    datapostulation={datapostulation}
                  />
                </div>
              ) : (
                <></>
              )}
              {display === 3 ? (
                <div>
                  <OfertaInicioUser get={actualizar} datauser={datauser} />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PerfilUser;
