import React, { useState } from "react";
import { Button, Modal} from "react-bootstrap"


function Ejercicio4() {
  const [photo, setPhoto] = useState(false);
  const handleClose = () => setPhoto(false);
  const handleShow = () => setPhoto(true);
  
  return (
    <div className="container m-5">
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      <Modal show={photo} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Ejercicio4;
