import React from "react";

const login_employe = () => {
  return (
    <div className="container">
      <div className="col-4 text-center pb-5 border border-primary bg-secondary text-white form-group mb-3">
        <h1 className="mt-4">Bienvenido</h1>
        <h4 className="mb-2">login de candidatos</h4>
        <div className="mb-4">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
              <label for="exampleInputPassword1">repeat the Password</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default login_employe;
