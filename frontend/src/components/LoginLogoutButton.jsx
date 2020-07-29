import React, { useState } from "react";
import { FiUser, FiUserX, FiUserPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import LoginBody from "./LoginBody";
import sweetalert from "sweetalert2";
import axios from "axios";
import auth from "../utils/auth";

function LoginLogoutButton(props) {
  const [photo, setPhoto] = useState(false);
  const handleClose = () => setPhoto(false);
  const handleShow = () => setPhoto(true);
  // const [forceUpdate, setForceUpdate] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const history = useHistory();

  const signOutHandler = async (e) => {
    e.preventDefault();
    // try {
    //   await axios.get(
    //     "/api/v1/users/administrators/logout"
    //   );
    //   auth.logout();
    //   await sweetalert.fire("ADMINISTRADOR", "Sesión cerrada", "success");
    //   history.push("/");
    //   return;
    // } catch (error) {}

    try {
      await axios.get("/api/v1/users/candidates/logout");
      auth.logout();
      await sweetalert.fire({
        icon: 'success',
        title:  "Sesión cerrada",
        showConfirmButton: false,
        width: "auto",
        timer: 1500
      }) 
      // await sweetalert.fire("", "Sesión cerrada", "success");
      // setForceUpdate(true);
      history.push("/");
      handleClose();
    } catch (error) {
      sweetalert.fire("ERROR", "error de deslogueo", "error");
      localStorage.clear()
      history.push("/");
    }
  };

  // const user = (datos) => {
  //   props.id(datos);
  // };

  return (
    <div className="">
      {auth.isAuthenticated() ? (
        <div className="container mx-2 d-flex flex-row align-items-baseline">
          <h5 className=" usernameLoguin text-white">Bienvenido {username}</h5>
          <button
            onClick={signOutHandler}
            className="btn btn-secondary rounded-pill"
          ><FiUserX/> Cerrar Sesión
          </button>
        </div>
      ) : (
        <div className="container  mx-2">
           <li className="nav-item active tituloLinks">
                <NavLink className="nav-link text-white react-icons" to="/register_employe">
                <FiUserPlus/> Regístrate <span className="sr-only">(current)</span>
                </NavLink>
              </li>
          <Button
            variant="primary"
            className="btn btn-success rounded-pill react-icons"
            onClick={handleShow}
          > <FiUser /> Iniciar Sesión
          </Button>
          <Modal show={photo} onHide={handleClose} >
            <Modal.Header closeButton>
              <Modal.Title>
                <div className="ml-5 d-flex flex-column align-items-center">
                  <h3 className="ml-4 tituloCartel">Iniciar Sesión</h3>
                  <h5 className="text-center datosCartel">
                    Por Favor, ingrese sus credenciales para continuar
                  </h5>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <LoginBody 
              setUsername={setUsername}
              //  user={user}
               />
            </Modal.Body>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default LoginLogoutButton;
