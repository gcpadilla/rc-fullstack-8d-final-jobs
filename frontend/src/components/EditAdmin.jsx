import React, { useState } from "react";

const EditAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="container">
      <div className="text-center pb-5 form-group mb-3">
        <h3 className="mt-4 titulos">Bienvenido</h3>
        <h5 className="mb-4 texdo">Edicion de Administrador</h5>
        <p className="mb-4 textNews">
          {" "}
          Aqui podra cambiar su nombre de usuario y su clave.
        </p>
        <div className="mb-4"></div>
        <form>
          <div className="form-group">
            <label htmlFor="username">username</label>
            <input
              type="text"
              required
              className="form-control form-control-sm"
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            {" "}
            <label htmlFor="inputPassword5">Contraseña</label>
            <input
              type="password"
              required
              minLength="8"
              placeholder="Contraseña"
              id="inputPassword5"
              name="password"
              autoComplete="off"
              className="form-control form-control-sm"
              aria-describedby="passwordHelpBlock"
              onChange={(e) => setPassword(e.target.value)}
            />
            <small id="passwordHelpBlock" className="form-text text-muted">
              la password debe tener entre 8 y 20 caracteres, contener letras y
              numeros, tiene que contener por lo menos una mayuscula y una
              minuscula.
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAdmin;
