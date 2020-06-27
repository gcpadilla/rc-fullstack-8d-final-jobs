import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import sweetalert from "sweetalert2";
import axios from "axios";
import auth from "../utils/auth";

const LoginBody = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signInHandler = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/users/candidates/login",
        {
          username: username.trim(),
          password: password.trim(),
        }
      );

      auth.login(response.data.token);
      console.log("logueado");
      await sweetalert.fire(
        "genial",
        `Bienvenido ${username.trim()}`,
        "success"
      );
      history.push("/");
    } catch (error) {
      sweetalert.fire("ERROR", error.response.data.message, "error");
    }
  };

  return (
    <div>
      <div>
        <div className="mb-4">
          <form>
            <div className="form-group">
              {/* <label for="exampleInputEmail1">Email address</label> */}
              <input
                type="text"
                required
                className="form-control rounded-pill"
                id="username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="Ingrese el username"
              />
            </div>
            <div className="form-group">
              {/* <label for="exampleInputPassword1">Password</label> */}
              <input
                type="password"
                required
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                className="form-control rounded-pill"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
              />
              <div className="mt-3 text-center">
                <button
                  type="submit"
                  className="text-center btn btn-success rounded-pill"
                  onClick={signInHandler}
                >
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginBody;
