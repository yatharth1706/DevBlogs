import React, { useEffect, useRef, useState } from "react";
import Layout from "../layouts/layout";
import { Form, Card, Button, FormControl, FormLabel, FormGroup, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthProvider";
import { useRouter } from "next/router";
import Head from "next/head";
import { store } from "react-notifications-component";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();
  const notification = {
    title: "Info",
    message: "Successfully Signed in!",
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
    animationOut: ["animate__animated animate__fadeOut"], // `animate.css v4` classes
  };

  useEffect(() => {
    if (error.trim() !== "") {
      let errorNotification = {
        title: error,
        message: error,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
        animationOut: ["animate__animated animate__fadeOut"], // `animate.css v4` classes
      };
      store.addNotification({
        ...errorNotification,
        container: "top-right",
        dismiss: {
          duration: 2000,
        },
      });
    }
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      store.addNotification({
        ...notification,
        container: "top-right",
        dismiss: {
          duration: 2000,
        },
      });
      router.push("/");
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  const googleLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await loginWithGoogle();
      store.addNotification({
        ...notification,
        container: "top-right",
        dismiss: {
          duration: 2000,
        },
      });
      router.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="d-flex w-full align-items-center justify-content-center pt-4">
      <Head>
        <title>Login</title>
      </Head>
      <Card style={{ width: "380px" }}>
        <Card.Header>
          <h3>Login</h3>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormControl type="email" placeholder="Enter email here" ref={emailRef} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Password</FormLabel>
              <FormControl type="password" placeholder="Enter password here" ref={passwordRef} />
            </FormGroup>
            <Button
              disabled={loading}
              className="w-100"
              style={{ backgroundColor: "#162353" }}
              variant="dark"
              type="submit"
            >
              Login
            </Button>
            <p className="text-center mt-3">Or</p>
            <Button
              className="w-100 outline-light"
              variant="light"
              onClick={googleLogin}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <span style={{ display: "flex" }}>
                <img src="/img/google.png" width={23} height={23} className="mr-2" /> Sign in with
                Google
              </span>
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
