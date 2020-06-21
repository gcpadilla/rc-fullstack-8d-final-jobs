import React from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';



function Login(props) {
    return (
        <div>
            <MDBContainer>
  <MDBBtn onClick={this.props.toggle}>Modal</MDBBtn>
  <MDBModal isOpen={this.props.modal} toggle={this.props.toggle}>
    <MDBModalHeader toggle={this.props.toggle}>{this.props.title}</MDBModalHeader>
    <MDBModalBody>
      {this.props.children}
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
      <MDBBtn color="primary">Save changes</MDBBtn>
    </MDBModalFooter>
  </MDBModal>
 </MDBContainer>
        </div>
    )
}

export default Login
