import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function Login() {
  const [photo, setPhoto] = useState(false);
  const handleClose = () => setPhoto(false);
  const handleShow = () => setPhoto(true);

  return (
    <div >
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      <Modal show={photo} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="ml-5">
            <h3 className ="ml-4" >Login de candidatos</h3>  
            </div>
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <form>
              <div className="form-group">
                {/* <label for="exampleInputEmail1">Email address</label> */}
                <input
                  type="email"
                  className="form-control rounded-pill"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                {/* <label for="exampleInputPassword1">Password</label> */}
                <input
                  type="password"
                  className="form-control rounded-pill"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
                <div className="mt-3 text-center">
                  <button
                    type="submit"
                    className="text-center btn btn-success rounded-pill"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default  Login;