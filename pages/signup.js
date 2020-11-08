import React, {useRef, useState} from 'react';
import Layout from '../layouts/layout';
import {Form, Card, Button, FormControl, FormLabel, FormGroup, Alert} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthProvider';
import {useRouter} from 'next/router';

const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confPasswordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {signup, loginWithGoogle, currUser} = useAuth();
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();

        if(passwordRef.current.value !== confPasswordRef.current.value){
            return setError('Passwords do not match');
        }

        try{
            setError('');
            setLoading(true);
            const response = await signup(emailRef.current.value, passwordRef.current.value);
            let uid = response.user.uid;
            router.push(`personalDetails/${uid}`);
                    
        }catch(error){
            setError(error.message);
        }
        setLoading(false);
    }

    const googleLogin = async (e) => {
       e.preventDefault();
        try {
            setError('');
            await loginWithGoogle();
            router.push("/");
            
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className = "d-flex w-100 align-items-center justify-content-center" style={{minHeight: "90vh"}}>
            <Card style = {{width : "380px"}}>
                <Card.Header><h3>Sign Up</h3></Card.Header>
                <Card.Body>
                    
                    {error && <Alert variant = "danger">{error}</Alert>}
                    <Form onSubmit = {handleSignup}>
                        <FormGroup>
                            <FormLabel>Email</FormLabel>
                            <FormControl type = "email" placeholder = "Enter email here" ref = {emailRef} />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Password</FormLabel>
                            <FormControl type = "password" placeholder = "Enter password here" ref ={passwordRef} />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl type = "password" placeholder = "Enter password again" ref = {confPasswordRef} />
                        </FormGroup>
                        <Button disabled = {loading} className = "w-100" variant = "primary" style={{backgroundColor: "#5952cb"}} type = "submit">Signup</Button>
                        <p className = "text-center mt-3">Or</p>
                        <Button className = "w-100" onClick = {googleLogin} variant = "light"><img src="/img/google.png" width={23} height={23} /> Sign in with Google</Button> 
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Signup;