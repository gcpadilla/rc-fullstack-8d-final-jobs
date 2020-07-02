import React from "react";
import LoginBody from "../components/LoginBody";

function Login_employe() {
  return (
    <div>
      <button
        type="button"
        className="btn btn-success rounded-pill"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Iniciar Sesión
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className="ml-5">
                <h3 className="ml-4">Bienvenido</h3>
                <p className="tituloLinks">Por favor, ingrese sus datos para continuar</p>
              </div>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="m-3">
              <LoginBody />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login_employe;
