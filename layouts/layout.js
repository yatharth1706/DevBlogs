import React from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthProvider";
import { useRouter } from "next/router";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/link";
import { store } from "react-notifications-component";

const Layout = ({ children }) => {
  const { currUser, logout } = useAuth();
  const router = useRouter();

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
  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    store.addNotification({
      ...createNotification("Logged out!", "success"),
      container: "top-right",
      dismiss: {
        duration: 3000,
      },
    });
    router.push("/");
  };

  return (
    <div>
      <div className="flex w-full shadow justify-between px-20 py-2">
        <div>
          <Link href="/">
            <a className="text-2xl font-semibold">DevBlogs</a>
          </Link>
        </div>
        <div>
          <Link href="/posts/create">
            <Fab color="dark" aria-label="add" size="small" className="mr-3">
              <AddIcon />
            </Fab>
          </Link>
          {currUser ? (
            <Button style={{ backgrountColor: "#162353" }} onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <div>
              <Link href="/login">
                <a>
                  <Button
                    className="mr-3"
                    style={{ backgroundColor: "#162353", border: "1px solid #162353" }}
                  >
                    SignIn
                  </Button>
                </a>
              </Link>
              <Link href="/signup">
                <a>
                  <Button variant="dark">Create account</Button>
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;
