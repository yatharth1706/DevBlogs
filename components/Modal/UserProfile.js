import React from 'react';
import {Modal, Button, Form, FormLabel} from 'react-bootstrap';

const UserProfile = (props) => {
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            <h1>My Profile</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className = "text-center">
                <img src = {props.userInfo && props.userInfo.profilePic.trim()!=='' ? props.userInfo.profilePic : props.defaultPic} style={{height: "100px", width: "100px", borderRadius : "50%"}}/>
            </div>
            <h4>Personal Info</h4>
            <p>
              <Form.Group>
              <FormLabel>Display Name</FormLabel>
              <Form.Control type="text" value={props.userInfo && props.userInfo.displayName} readOnly = {true} />
              </Form.Group>
              <Form.Group>
                <FormLabel>Email</FormLabel>
                <Form.Control type="email" value={props.userInfo && props.userInfo.email} readOnly = {true} />
              </Form.Group>
              <Form.Group>
                <FormLabel>Github URL</FormLabel>
                <Form.Control type="text" value={props.userInfo && props.userInfo.githubUrl} readOnly = {true} />
              </Form.Group>  
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button>Edit Profile</Button>
            <Button onClick={props.onHide} variant = "dark">Close</Button>
          </Modal.Footer>
        </Modal>
      );
};

export default UserProfile;