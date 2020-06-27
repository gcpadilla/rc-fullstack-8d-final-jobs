import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import LoginBody from "./LoginBody";
import sweetalert from "sweetalert2";
import axios from "axios";
import auth from "../utils/auth";

function LoginLogoutButton() {
    const [photo, setPhoto] = useState(false);
    const handleClose = () => setPhoto(false);
    const handleShow = () => setPhoto(true);
    const [forceUpdate, setForceUpdate] = useState(false);
    const history = useHistory();
    
  
    useEffect(() => {
      if (forceUpdate) {
        setForceUpdate(false);
      }
    }, [forceUpdate]);
  
    const signOutHandler = async (e) => {
      e.preventDefault();
      try {
        await axios.get("http://localhost:3001/api/v1/users/candidates/logout");
        auth.logout();
        await sweetalert.fire("", "seccion cerrada", "success");
        setForceUpdate(true);
        history.push("/");
        handleClose();
      } catch (error) {
        sweetalert.fire("ERROR", "error de deslogueo", "error");
      }
    };

    return (
        <div >
             {auth.isAuthenticated() ? (
              <div>
                <button
                  onClick={signOutHandler}
                  className="btn btn-secondary rounded-pill"
                >
                  Cerrar seccion
                </button>
              </div>
            ) : (
              <div>
                <Button
                  variant="primary"
                  className="btn btn-success rounded-pill"
                  onClick={handleShow}
                >
                  iniciar seccion
                </Button>
                <Modal show={photo} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      <div className="ml-5">
                        <h3 className="ml-4">Login de candidatos</h3>
                      </div>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <LoginBody />
                  </Modal.Body>
                </Modal>
              </div>
            )}
        </div>
    )
}

export default LoginLogoutButton
