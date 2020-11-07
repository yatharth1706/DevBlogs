import React, {useState, useRef} from 'react';
import {Card, Form, FormControl, Button, FormGroup, FormLabel, Image} from 'react-bootstrap';
import {Link} from 'next/link';
import { AuthProvider } from '../../contexts/AuthProvider';
import {useRouter} from 'next/router';
import {useAuth} from '../../contexts/AuthProvider';


const PersonalDetails = () => {
    const [error, setError] = useState('');
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
            
        } catch (error) {
            
        }

    }


    return (
        <div style = {{height : "auto", margin: "100px auto", width: "700px"}}>
            <Card>
                <Card.Header className="text-center">
                <h4>Enter your personal details</h4>
                </Card.Header>
                <Card.Body className = "d-flex">
                    <div  style={{display : "flex", flexDirection : "column", width : "50%", marginRight : "10px", justifyContent : "center", alignItems : "center"}}>
                        <Image src = "https://cahsi.utep.edu/wp-content/uploads/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png" alt = "Profile pic" width="140" height="140" roundedCircle className="mb-3" />
                        <FormControl type="file" placeholder = "Choose profile pic" className = "mb-3" style={{boxShadow: "0 0 0 1px lightgray"}} />
                        <Button style={{backgroundColor : "#5952cb"}}>Upload profile</Button>
                    </div>
                    <Form style={{width: "500px"}} onSubmit = {savePersonalDetails}>
                        <FormGroup>
                            <FormLabel>First Name</FormLabel>
                            <FormControl type = "text" placeholder = "Enter your first name" ref = {firstNameRef}/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Email</FormLabel>
                            <FormControl type = "email" placeholder = "Enter your email" ref = {emailRef}/>
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
};

export default PersonalDetails;