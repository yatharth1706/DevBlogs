import React, { useRef, useState } from "react";
import Layout from "../layouts/layout";
import { useAuth } from "../contexts/AuthProvider";
import { useRouter } from "next/router";
import { store } from "react-notifications-component";
import Head from "next/head";

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
    <div className="px-4 d-flex w-full align-items-center justify-content-center pt-4">
      <Head>
        <title>Signup</title>
      </Head>
      <div className="shadow p-8 w-full md:w-3/6 mx-auto my-6">
        <div className="mb-3">
          <h3 className="text-xl">Sign Up</h3>
        </div>
        <div>
          {error && <Alert variant="danger">{error}</Alert>}
          <form onSubmit={handleSignup}>
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
            <div className="flex flex-col mb-2">
              <label className="mb-1">Confirm Password</label>
              <input
                className="outline-none border px-2 py-1 rounded"
                type="password"
                placeholder="Enter password again"
                ref={confPasswordRef}
              />
            </div>

            <button
              disabled={loading}
              className="mt-3 w-full p-2 text-white rounded"
              variant="dark"
              style={{ backgroundColor: "#162353" }}
              type="submit"
            >
              Signup
            </button>
            <p className="text-center mt-3">Or</p>
            <button
              className="w-full p-2 bg-gray-100 p-2"
              onClick={googleLogin}
              variant="light"
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

export default Signup;
