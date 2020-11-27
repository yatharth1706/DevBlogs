import React from 'react';
import { useState } from 'react';
import {Modal, Button, Form, FormLabel, FormGroup, FormControl} from 'react-bootstrap';

const UserProfile = (props) => {
    
  const [isEditClicked, setIsEditClicked] = useState(false); 
  const [isProfilePicChanged, setIsProfilePicChanged] = useState(false);

  const editProfile = () => {
    /** Update isEditClicked state and change all inputs from readonly to readWrite mode */
    /** Also change text of button to update profile */
    setIsEditClicked(!isEditClicked);
  }

  const updateProfile = () => {
    /** First check if profile pic is changed or not */
    /** Upload to storage and then take the url and store all info to firebase */
    /** Also change isEditClicked to false */
    setIsEditClicked(!isEditClicked);
  }

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
              <FormGroup style = {{display : isEditClicked ? "block" : "none"}}>
                <FormControl type = "file"/>
              </FormGroup>
          </div>
          <h4>Personal Info</h4>
          <p>
            <Form.Group>
            <FormLabel>Display Name</FormLabel>
            <Form.Control type="text" value={props.userInfo && props.userInfo.displayName} readOnly = {!isEditClicked} />
            </Form.Group>
            <Form.Group>
              <FormLabel>Email</FormLabel>
              <Form.Control type="email" value={props.userInfo && props.userInfo.email} readOnly = {!isEditClicked} />
            </Form.Group>
            <Form.Group>
              <FormLabel>Github URL</FormLabel>
              <Form.Control type="text" value={props.userInfo && props.userInfo.githubUrl} readOnly = {!isEditClicked} />
            </Form.Group>  
          </p>
        </Modal.Body>
        <Modal.Footer>
      <Button onClick = {isEditClicked === false ? editProfile : updateProfile}>{isEditClicked ? "Update Profile" : "Edit Profile"}</Button>
          <Button onClick={props.onHide} variant = "dark">Close</Button>
        </Modal.Footer>
      </Modal>
    );
};

export default UserProfile;