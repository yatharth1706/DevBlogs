import React, { useEffect, useRef, useState } from "react";
import Layout from "../layouts/layout";
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
    <div className="px-4 d-flex w-full align-items-center justify-content-center pt-4">
      <Head>
        <title>Login</title>
      </Head>
      <div className="shadow p-8 w-full md:w-3/6 mx-auto my-6">
        <div className="mb-3">
          <h3 className="text-xl">Login</h3>
        </div>
        <div>
          {error && <Alert variant="danger">{error}</Alert>}
          <form onSubmit={handleLogin}>
            <div className="flex flex-col mb-2">
              <label className="mb-1">Email</label>
              <input
                className="outline-none border px-2 py-1 rounded"
                type="email"
                placeholder="Enter email here"
                ref={emailRef}
              />
            </div>
            <div className="flex flex-col mb-2">
              <label className="mb-1">Password</label>
              <input
                className="outline-none border px-2 py-1 rounded"
                type="password"
                placeholder="Enter password here"
                ref={passwordRef}
              />
            </div>
            <button
              disabled={loading}
              className="mt-3 w-full p-2 text-white rounded"
              style={{ backgroundColor: "#162353" }}
              variant="dark"
              type="submit"
            >
              Login
            </button>
            <p className="text-center mt-3">Or</p>
            <button
              className="w-full mt-2 bg-gray-100 p-2"
              variant="light"
              onClick={googleLogin}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <span style={{ display: "flex" }}>
                <img src="/img/google.png" width={23} height={23} className="mr-2" /> Sign in with
                Google
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
