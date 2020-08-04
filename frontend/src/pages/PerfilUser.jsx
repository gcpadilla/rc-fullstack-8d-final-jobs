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
import sombra from "../images/sombra4.png";
// import profilePH from "../images/profile.jpg";
import PostulationInicio from "../components/PostulationInico";
import OfertaInicioUser from "../components/OfertaInicioUser";
import { AiOutlineEdit, AiFillFilePdf } from "react-icons/ai";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { IconContext } from "react-icons";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import Header from '../components/Header'
import Footer from '../components/Footer'

const PerfilUser = () => {
  const [display, setdisplay] = useState(1);
  const [UserSelec, setUserSelec] = useState({});
  const [datapostulation, setdatapostulation] = useState([]);
  const [datauser, setdatauser] = useState([]);
  // const [file, setfile] = useState(null);
  const history = useHistory();

  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });

  // TRAE LOS DATOS DE LAS OFERTAS Y POSTULACIONES
  const actualizar = () => {
    getpostulation();
    getuser();
  };
  const getuser = useCallback(async () => {
    try {
      const response = await axios.get(
        "/api/v1/offers/candidate/all"
      );
      setdatauser(response.data);
    } catch (error) {
      setdatauser([]);
    }
  }, []);

  const getpostulation = async () => {
    try {
      const response = await axios.get(
        "/api/v1/offer/postulates/user/all"
      );
      setdatapostulation(response.data);
    } catch (error) {
      setdatapostulation([]);
    }
  };

  // FUNCIONES DEL FORMULARIO PARA SER EDITADOS
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
            "/api/v1/users/candidates/",
            UserSelec
          );
          Swal.fire({
            icon: "success",
            text: "modificado correctamente...",
            width: "auto",
            showConfirmButton: false,
            timer: 1500,
          });
          // setUserSelec({});
          setdisplay(1)
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
      "/api/v1/users/candidates/edit/"
    );
    setUserSelec(response.data);
  }, []);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  // CERRAR SESION
  const signOutHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.get("/api/v1/users/candidates/logout");
      auth.logout();
      await Swal.fire({
        icon: "success",
        title: "Sesión cerrada",
        showConfirmButton: false,
        width: "auto",
        timer: 1500,
      });
      // await Swal.fire("", "Sesión cerrada", "success");
      history.push("/");
    } catch (error) {
      Swal.fire("ERROR", "error de deslogueo", "error");
      localStorage.clear()
      history.push("/");
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
          "/api/v1/users/candidates/upImagen",
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
        width: "auto",
        showConfirmButton: false,
        timer: 1500,
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
    guardarCv(e.target.files[0]);
  };

  const guardarCv = async (f) => {
    try {
      if (f !== null) {
        const formData = new FormData();
        formData.append("CV", f);
        await axios.post(
          "/api/v1/users/candidates/upCv",
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );
      }
      setState({ isPaneOpenLeft: false })
      Swal.fire({
        icon: "success",
        text: "Se guardo correctamente su curriculum vitae",
        maxWidth: 300,
        showConfirmButton: false,
        timer: 1500,
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

  return (
    <>
     <Header />
      <div>
        <div style={{ marginTop: "15px", marginLeft: "15px" }}>
          <div  onClick={() => setState({ isPaneOpenLeft: true })}>
            <IconContext.Provider value={{ size:"30px" }}><AiOutlineMenuUnfold/></IconContext.Provider> Menu
        </div>
        </div>
        <SlidingPane
          isOpen={state.isPaneOpenLeft}
          from="left"
          width="240px"
          className="bg-primary"
          onRequestClose={() => setState({ isPaneOpenLeft: false })}
        >
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
              <div>
                <h2 className="text-white font-weight-bold text-center">
                  Bienvenido {UserSelec.username}
                </h2>
              </div>
              <div>
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
                  <div className="imgPerfil btn-link text-white poiter mt-3">
                    <label htmlFor="file_input_id" className="labelnav">
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
              <div className="">
                <div
                  onClick={() => {
                    setdisplay(0);
                    setState({ isPaneOpenLeft: false })
                    actualizar();
                  }}
                  className="btn-link text-white poiter mt-1"
                >
                  {" "}
                  <FaRegEdit /> Editar Perfil
                </div>
                <div
                  onClick={() => {
                    setdisplay(2);
                    setState({ isPaneOpenLeft: false })
                    actualizar();
                  }}
                  className="btn-link text-white poiter mt-1"
                >
                  {" "}
                  <BsFilePost /> Postulaciones
                </div>
                <div
                  onClick={() => {
                    setdisplay(3);
                    setState({ isPaneOpenLeft: false })
                    actualizar();
                  }}
                  className="btn-link text-white poiter mt-1"
                >
                  {" "}
                  <MdLocalOffer /> Ofertas{" "}
                </div>
                  <div className="imgPerfil ">
                <form onSubmit={guardarCv}>
                    <label htmlFor="cv_input_id"  className="btn-link text-white poiter mt-1">
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
                <div
                  onClick={signOutHandler}
                  className="btn-link text-white poiter mt-1"
                >
                  {" "}
                  Cerrar Sesión
                </div>
              </div>
          </div>
        </SlidingPane>
        <div>
            <div className="container">
              {display === 0 ? (
                <div className="col-12">
                  <div className="text-center pb-5 form-group mb-3">
                    <h3 className="mt-4 titulos">Bienvenido</h3>
                    <h5 className="mb-4 texto">Edición de Registro de candidatos</h5>
                    <p className="mb-4 textNews">
                      {" "}
                      Aqui puede modificar sus datos personales.
                    </p>
                    <div className="mb-4">
                      <form onSubmit={onsubmit}>
                        <div className="form-group">
                          <div className=" form-row ">
                            <div className="form-group col-6">
                              <label htmlFor="firstame" className="formLabel">
                                Nombre
                              </label>
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
                              <label htmlFor="lastname" className="formLabel">
                                Apellido
                              </label>
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
                              <label htmlFor="dni" className="formLabel">
                                Documento
                              </label>
                              <input
                                type="number"
                                required
                                className="form-control"
                                name="dni"
                                defaultValue={UserSelec.dni}
                                onChange={onInputChange}
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor="email" className="formLabel">
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
                        </div>

                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="profession" className="formLabel">
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
                            <label
                              htmlFor="exampleInputPassword1"
                              className="formLabel"
                            >
                              Contraseña
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
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="username" className="formLabel">
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

                          <div className="form-group col-md-6">
                            {" "}
                            <label htmlFor="password" className="formLabel">
                              Repita la Contraseña
                            </label>
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
                              contener letras y numeros, tiene que contener por
                              lo menos una mayuscula y una minuscula.
                            </small>
                          </div>
                        </div>
                        <div>
                        <button
                          type="submit"
                          onClick={() => setdisplay(1)}
                          className="btn btn-danger rounded-pill mr-5"
                        >
                        Cerrar
                        </button>
                        <button
                          type="submit"
                          onSubmit={onsubmit}
                          className="btn btn-success rounded-pill"
                        >
                          Modificar Registro
                        </button>
                        </div>
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
      <Footer />
    </>
  );
};

export default PerfilUser;
