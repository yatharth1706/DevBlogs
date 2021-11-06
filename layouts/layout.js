import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthProvider";
import { useRouter } from "next/router";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/link";
import { store } from "react-notifications-component";
import LoginIcon from "@material-ui/icons/VpnKey";
import SignupIcon from "@material-ui/icons/SupervisorAccount";
import TagIcon from "@material-ui/icons/LocalOffer";
import FAQIcon from "@material-ui/icons/QuestionAnswer";
import InfoIcon from "@material-ui/icons/Info";
import DraftIcon from "@material-ui/icons/Drafts";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import BlogIcon from "@material-ui/icons/Pages";
import UserProfile from "../components/Modal/UserProfile";
import BarIcon from "@material-ui/icons/Dehaze";
import CloseIcon from "@material-ui/icons/Close";
import { db } from "../config/firebase.config";
import "tailwindcss/tailwind.css";

const Layout = ({ children }) => {
  const { currUser, logout } = useAuth();
  const [userInfo, setUserInfo] = useState();
  const defaultPic =
    "https://t3.ftcdn.net/jpg/02/10/49/86/360_F_210498655_ywivjjUe6cgyt52n4BxktRgDCfFg8lKx.jpg";
  const [modalShow, setModalShow] = useState(false);
  const [navState, setNavState] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (currUser) {
      db.collection("users")
        .doc(currUser.uid)
        .get()
        .then((doc) => {
          console.log("User info");
          setUserInfo(doc.data());
          console.log(doc.data());
        });
    }
  }, [currUser]);

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
      <div className="w-full flex py-2 shadow justify-between px-8">
        <div>
          <Link href="/">
            <a className="text-2xl font-semibold" style={{ fontSize: "23px", marginTop: "3px" }}>
              DevBlogs
            </a>
          </Link>
        </div>
        <div className="flex space-x-3">
          <Link href="/blog/create">
            <Fab color="dark" aria-label="add" size="small" className="mr-3">
              <AddIcon />
            </Fab>
          </Link>
          <span className="block md:hidden" onClick={() => setNavState(!navState)}>
            <Fab color="dark" aria-label="add" size="small" className="mr-3">
              {navState ? <CloseIcon /> : <BarIcon />}
            </Fab>
          </span>

          {currUser ? (
            <a
              style={{ backgrountColor: "#162353" }}
              className="cursor-pointer mt-2"
              onClick={handleLogout}
            >
              Logout
            </a>
          ) : (
            <div className="flex space-x-3 mt-2 hidden md:block">
              <Link href="/login">
                <span
                  className="px-2 py-2 bg-black rounded text-white cursor-pointer"
                  style={{ background: "#162353" }}
                >
                  SignIn
                </span>
              </Link>
              <Link href="/signup">
                <span className="cursor-pointer">Create account</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Toggle navbar  */}
      {navState && (
        <div className="w-60 shadow h-screen bg-white absolute left-0 top-0">
          <div className="flex flex-col mt-2 px-4 py-2 ">
            {currUser && (
              <div
                style={{
                  display: "flex",
                  lineHeight: "40px",
                  border: "1px solid white",
                  borderBottomColor: "lightgray",
                  marginBottom: "20px",
                }}
                className="profilePicHolder"
              >
                {userInfo && (
                  <div className="py-2 flex" onClick={() => setNavState(!navState)}>
                    <img
                      src={userInfo.profilePic.trim() !== "" ? userInfo.profilePic : defaultPic}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginRight: "10px",
                      }}
                      alt="profile pic"
                    />{" "}
                    <span>{userInfo.displayName}</span>
                  </div>
                )}
              </div>
            )}
            {currUser ? null : (
              <div className="flex flex-col">
                <Link href="/login">
                  <div className="sidebar-link cursor-pointer" onClick={() => setNavState(false)}>
                    <LoginIcon />
                    Sign in
                  </div>
                </Link>
                <Link href="/signup">
                  <div className="sidebar-link cursor-pointer" onClick={() => setNavState(false)}>
                    <SignupIcon />
                    Create an account
                  </div>
                </Link>
              </div>
            )}
            <Link href="/">
              <div className="sidebar-link cursor-pointer" onClick={() => setNavState(false)}>
                <BlogIcon />
                All Blogs
              </div>
            </Link>
            {userInfo && (
              <Link href={"/drafts/" + (currUser && currUser.uid)}>
                <div className="sidebar-link cursor-pointer" onClick={() => setNavState(false)}>
                  <DraftIcon />
                  Drafts
                </div>
              </Link>
            )}

            <Link href="/about">
              <div className="sidebar-link cursor-pointer" onClick={() => setNavState(false)}>
                <InfoIcon />
                About
              </div>
            </Link>

            <Link href="/contact">
              <div className="sidebar-link cursor-pointer" onClick={() => setNavState(false)}>
                <ContactSupportIcon />
                Contact
              </div>
            </Link>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row">
        <div className="px-6 py-8 hidden lg:block">
          {currUser && (
            <div
              style={{
                display: "flex",
                lineHeight: "40px",
                border: "1px solid white",
                borderBottomColor: "lightgray",
                marginBottom: "20px",
              }}
              className="profilePicHolder"
            >
              {userInfo && (
                <div className="py-2 flex">
                  <img
                    src={userInfo.profilePic.trim() !== "" ? userInfo.profilePic : defaultPic}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                    alt="profile pic"
                  />{" "}
                  <span>{userInfo.displayName}</span>
                </div>
              )}
            </div>
          )}
          {currUser ? null : (
            <>
              <Link href="/login">
                <div className="sidebar-link px-2 cursor-pointer">
                  <LoginIcon />
                  Sign in
                </div>
              </Link>
              <Link href="/signup">
                <div className="sidebar-link px-2 cursor-pointer">
                  <SignupIcon />
                  Create an account
                </div>
              </Link>
            </>
          )}
          <Link href="/">
            <div className="sidebar-link cursor-pointer px-2">
              {" "}
              <BlogIcon />
              All Blogs
            </div>
          </Link>
          {currUser && (
            <Link href={"/drafts/" + (currUser && currUser.uid)}>
              <div className="sidebar-link cursor-pointer px-2">
                <DraftIcon />
                Drafts
              </div>
            </Link>
          )}

          <Link href="/about">
            <div className="sidebar-link cursor-pointer px-2">
              <InfoIcon />
              About
            </div>
          </Link>

          <Link href="/contact">
            <div className="sidebar-link cursor-pointer px-2">
              <ContactSupportIcon />
              Contact
            </div>
          </Link>

          <UserProfile
            show={modalShow}
            onHide={() => setModalShow(false)}
            userInfo={userInfo}
            defaultPic={defaultPic}
          />
        </div>

        <div className="w-full lg:w-4/6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
