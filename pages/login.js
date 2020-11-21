import React, {useEffect, useRef, useState} from 'react';
import Layout from '../layouts/layout';
import {Form, Card, Button, FormControl, FormLabel, FormGroup, Alert} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthProvider';
import {useRouter} from 'next/router';
import Head from 'next/head';
import {store} from 'react-notifications-component';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {login, loginWithGoogle} = useAuth();
    const router = useRouter();
    const notification = {
        title: "Successfully Signed in!",
        message: "Configurable",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
        animationOut: ["animate__animated animate__fadeOut"] // `animate.css v4` classes
      };

      const errorNotification = {
        title: error,
        message: "Configurable",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
        animationOut: ["animate__animated animate__fadeOut"] // `animate.css v4` classes
      }

    useEffect(() => {
        if(error.trim()!==''){
            store.addNotification({...errorNotification,container: 'top-right'})
        }
    },[error])

    const handleLogin = async (e) => {
        e.preventDefault();

        try{

            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            store.addNotification({
                ...notification,
                container: 'top-right'
             })
            router.push("/");        
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
        <div className = "d-flex w-100 align-items-center justify-content-center" style={{minHeight: "80vh"}}>
            <Head>
                <title>Login</title>
            </Head>
            <Card style = {{width : "380px"}}>
                <Card.Header><h3>Login</h3></Card.Header>
                <Card.Body>
                    {error && <Alert variant = "danger">{error}</Alert>}
                    <Form onSubmit = {handleLogin}>
                        <FormGroup>
                            <FormLabel>Email</FormLabel>
                            <FormControl type = "email" placeholder = "Enter email here" ref = {emailRef} />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Password</FormLabel>
                            <FormControl type = "password" placeholder = "Enter password here" ref ={passwordRef} />
                        </FormGroup>
                        <Button disabled = {loading} className = "w-100" style={{backgroundColor: "#5952cb"}} variant = "primary" type = "submit">Login</Button>
                        <p className = "text-center mt-3">Or</p>
                        <Button className = "w-100 outline-light" variant = "light" onClick = {googleLogin}><img src="/img/google.png" width={23} height={23} /> Sign in with Google</Button> 
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Login;