import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import sweetalert from "sweetalert2";
import axios from "axios";
import auth from "../utils/auth";

const LoginBody = (props) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [flag, setflag] = useState(true);  
  const history = useHistory();

  const signInHandler = async (e) => {  
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/v1/users/administrators/login",
        {
          username: username.trim(),
          password: password.trim(),
        }
      );
      auth.login(response.data.token, response.data.username, response.data.role);
      await sweetalert.fire({
        icon: 'success',
        title:  `Bienvenido ${username.trim()}`,
        showConfirmButton: false,
        width: "auto",
        timer: 1500
      }) 
      history.push("/company");
      return;
    } catch (error) {
      setflag(false)
    }
if (flag===true) {
  try {
    const response = await axios.post(
      "/api/v1/users/candidates/login",
      {
        username: username.trim(),
        password: password.trim(),
      }
    );
    auth.login(response.data.token, response.data.username, response.data.role) ;
    await sweetalert.fire({
      icon: 'success',
      title:  `Bienvenido ${username.trim()}`,
      showConfirmButton: false,
      width: "auto",
      timer: 1500
    }) 
    // await sweetalert.fire(
    //   "genial",
    //   `Bienvenido ${username.trim()}`,
    //   "success"
    // );
    props.setUsername(response.data.username);
    // props.user(response.data)
    history.push("/");
  } catch (error) {
    sweetalert.fire("ERROR", error.response.data.message, "error");
    setflag(true)
  }
  
  
}
    
  };

  return (
    <div>
      <div>
        <div className="mb-4">
          <form onSubmit={signInHandler}>
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
                placeholder="Nombre de Usuario"
                // ref={props.inputEl}
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
                placeholder="Contraseña"
              />
              <div className="mt-3 text-center">
                <button
                  type="submit"
                  className="text-center btn btn-success rounded-pill">
                  Ingresar
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
