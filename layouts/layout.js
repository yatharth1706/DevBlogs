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
import { db } from "../config/firebase.config";

const Layout = ({ children }) => {
  const { currUser, logout } = useAuth();
  const [userInfo, setUserInfo] = useState();
  const defaultPic =
    "https://t3.ftcdn.net/jpg/02/10/49/86/360_F_210498655_ywivjjUe6cgyt52n4BxktRgDCfFg8lKx.jpg";
  const [modalShow, setModalShow] = useState(false);

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
      <div className="flex w-full shadow justify-between px-20 py-2">
        <div>
          <Link href="/">
            <a className="text-2xl font-semibold">DevBlogs</a>
          </Link>
        </div>
        <div>
          <Link href="/blog/create">
            <Fab color="dark" aria-label="add" size="small" className="mr-3">
              <AddIcon />
            </Fab>
          </Link>
          {currUser ? (
            <Button style={{ backgrountColor: "#162353" }} onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
      <div className="homepage-container">
        <div>
          <div className="sidebar px-1">
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
                onClick={() => setModalShow(true)}
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
                <div className="sidebar-link px-2">
                  <LoginIcon />
                  Sign in
                </div>
                <div className="sidebar-link px-2">
                  <SignupIcon />
                  Create an account
                </div>
              </>
            )}
            <Link href="/">
              <div className="sidebar-link cursor-pointer px-2">
                {" "}
                <BlogIcon />
                All Blogs
              </div>
            </Link>
            {userInfo && (
              <Link href={"/drafts/" + userInfo.email}>
                <div className="sidebar-link cursor-pointer px-2">
                  <DraftIcon />
                  Drafts
                </div>
              </Link>
            )}

            <div className="sidebar-link cursor-pointer px-2">
              <TagIcon />
              Tags
            </div>
            <div className="sidebar-link cursor-pointer px-2">
              <InfoIcon />
              About
            </div>
            <div className="sidebar-link cursor-pointer px-2">
              <ContactSupportIcon />
              Contact
            </div>
            <UserProfile
              show={modalShow}
              onHide={() => setModalShow(false)}
              userInfo={userInfo}
              defaultPic={defaultPic}
            />
          </div>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
