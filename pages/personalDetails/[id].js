import React, {useState, useRef} from 'react';
import {Card, Form, FormControl, Button, FormGroup, FormLabel, Image, Alert,Col, Spinner} from 'react-bootstrap';
import {Link} from 'next/link';
import { AuthProvider } from '../../contexts/AuthProvider';
import {useRouter} from 'next/router';
import {useAuth} from '../../contexts/AuthProvider';
import {storage, db} from '../../config/firebase.config';

const PersonalDetails = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const profileRef = useRef();
    const githubRef = useRef();
    const router = useRouter();
    const {currUser} = useAuth();
    const {id} = router.query;

    const savePersonalDetails = (e) => {
        e.preventDefault();

        setError('');

        if(firstNameRef.current.value.trim() === ""){
            return setError("First name is empty");
        }
        
        try {
            setLoading(true);
            saveUserData();    
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }


    const saveUserData = () => {
        // using feature storage of firebase, pic will be uploaded to firebase
        const reference = storage().ref();
        let file = document.getElementById("profilePicFile").files[0];
        let url = '';
        if(file){
            const name = new Date() + "_" + file.name;
            const metadata  = {
                contentType : file.type
            }

            const task = reference.child(name).put(file, metadata);

            task.on('state_changed', (snapshot) =>{
                setError('');
              }, (error) => {
                setError(error.message);
              }, () => {
                task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    saveAllUserDataToFirestore(downloadURL);
                });
              });
          }else{
            saveAllUserDataToFirestore(url);
          }
          
        }

        const saveAllUserDataToFirestore = (url) => {
            const toStore = {
                "displayName" : firstNameRef.current.value +' ' +  lastNameRef.current.value,
                "profilePic" : url,
                "email" : emailRef.current.value,
                "githubUrl" : githubRef.current.value,
            }

            setLoading(true);
            db.collection('users').doc(currUser.uid).set(toStore).then(() => {
                router.push("/");
            })
        }
        
        const setProfilePic = (e) => {
            let file = e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                let fileContent = reader.result;
                document.getElementById("profilePicContainer").src = fileContent;
            }
        }
        
        return (
            <div style = {{height : "auto", margin: "30px auto", width: "600px", padding: "20px"}}>
                <Card>
                    <Card.Header className="text-center">
                    <h4>Enter your personal details</h4>
                    </Card.Header>
                    <Card.Body className = "d-flex" style={{"flexDirection" : "column"}}>
                    {loading === true ? <Alert variant = "success">Updating...</Alert>: ""}
                    {error && <Alert variant = "danger">{error}</Alert>}
                        <div  style={{display : "flex", flexDirection : "column", width : "100%", marginRight : "40px", justifyContent : "center", alignItems : "center"}}>
                            <Image src = "/img/profile.png" alt = "Profile pic" width="140" height="140" roundedCircle className="mb-3" id = "profilePicContainer"/>
                            <FormControl type="file" placeholder = "Choose profile pic" className = "mb-3" style={{boxShadow: "0 0 0 1px lightgray"}} id = "profilePicFile" onChange = {setProfilePic} />
                            
                        </div>
                        <Form style={{width: "100%"}} onSubmit = {savePersonalDetails}>
                        
                            <Form.Row>
                                <FormGroup as = {Col}>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl type = "text" placeholder = "Enter your first name" ref = {firstNameRef}/>
                                </FormGroup>
                                <FormGroup as = {Col}>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl type = "text" placeholder = "Enter your first name" ref = {lastNameRef}/>
                                </FormGroup>
                            </Form.Row>
                            <FormGroup>
                                <FormLabel>Email</FormLabel>
                                <FormControl type = "email" placeholder = "Enter your email" ref = {emailRef} defaultValue={currUser.email}/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Github</FormLabel>
                                <FormControl type = "text" placeholder = "Enter your github username" ref = {githubRef}/>
                            </FormGroup>
                            <Button type="submit" style={{backgroundColor : "#5952cb"}} className = "w-100">Continue</Button>
                            
                        </Form>
                    </Card.Body>
                </Card>
            </div>
    
        );
    }

export default PersonalDetails;