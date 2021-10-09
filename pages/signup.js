import React, { useRef, useState } from "react";
import Layout from "../layouts/layout";
import { Form, Card, Button, FormControl, FormLabel, FormGroup, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthProvider";
import { useRouter } from "next/router";
import { store } from "react-notifications-component";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confPasswordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle, currUser } = useAuth();
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confPasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      const response = await signup(emailRef.current.value, passwordRef.current.value);
      let uid = response.user.uid;
      store.addNotification({
        ...createNotification("Successfully Signed up!", "success"),
        container: "top-right",
        dismiss: {
          duration: 2000,
        },
      });
      router.push(`personalDetails/${uid}`);
    } catch (error) {
      store.addNotification({
        ...createNotification(error.message, "danger"),
        container: "top-right",
        dismiss: {
          duration: 2000,
        },
      });
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
        ...createNotification("Successfully Signed In!", "success"),
        container: "top-right",
        dismiss: {
          duration: 2000,
        },
      });
      router.push("/");
    } catch (error) {
      store.addNotification({
        ...createNotification(error.message, "danger"),
        container: "top-right",
        dismiss: {
          duration: 2000,
        },
      });
      setError(error.message);
    }
  };

  const createNotification = (message, type) => {
    const notification = {
      title: "Info",
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
      animationOut: ["animate__animated animate__fadeOut"], // `animate.css v4` classes
    };
    return notification;
  };

  return (
    <div className="d-flex w-full align-items-center justify-content-center pt-4">
      <Card style={{ width: "420px" }}>
        <Card.Header>
          <h3>Sign Up</h3>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSignup}>
            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormControl type="email" placeholder="Enter email here" ref={emailRef} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Password</FormLabel>
              <FormControl type="password" placeholder="Enter password here" ref={passwordRef} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl
                type="password"
                placeholder="Enter password again"
                ref={confPasswordRef}
              />
            </FormGroup>
            <Button
              disabled={loading}
              className="w-100"
              variant="dark"
              style={{ backgroundColor: "#162353" }}
              type="submit"
            >
              Signup
            </Button>
            <p className="text-center mt-3">Or</p>
            <Button
              className="w-100"
              onClick={googleLogin}
              variant="light"
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

export default Signup;
