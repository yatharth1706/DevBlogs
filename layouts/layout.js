import React from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthProvider';
import {useRouter} from 'next/router';
import {Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Link from 'next/link';
import { store } from 'react-notifications-component';

const Layout = ({children}) => {
    const {currUser, logout} = useAuth();
    const router = useRouter();

    const createNotification = (message, type) =>{
        const notification = {
            title: "Info",
            message: message,
            type: type,
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
            animationOut: ["animate__animated animate__fadeOut"] // `animate.css v4` classes
          };
          return notification;
    }
    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
        store.addNotification({
            ...createNotification("Logged out!", "success"),
            container : "top-right"
        })
        router.push("/");
    }

    return (
        <div>            
            <div style={{width: "90%", margin: "0 auto"}}>
                <Navbar collapseOnSelect className = "nav-color-custom" expand="lg"  variant = "light" sticky = "top">
                    <Navbar.Brand style={{paddingTop : ".1025rem", color: "black", "fontWeight" : "bold"}}><Link href = "/"><a>DevBlogs</a></Link></Navbar.Brand>
                    <Navbar.Toggle />
                <Navbar.Collapse>

                <Nav className = "mr-auto">
                    <div style={{width: "65px", height: "31px", backgroundColor : "#162353", borderRadius : "100px", alignItems:"center", padding:"3.5px"}}>
                        <div style={{width:"24px", height: "24px", borderRadius : "50%", backgroundColor:"white"}}></div>
                    </div>    
                </Nav>

                <Form inline>
                    <Nav.Link as={Link} href = "/posts/create" className = "mr-3"><a><Fab color="dark" aria-label="add" size = "small" className= "mr-3"><AddIcon /></Fab></a></Nav.Link>
                    {currUser ? <Button style={{backgrountColor : "#162353"}} onClick = {handleLogout}>Logout</Button> : <div>
                        <Link href = "/login"><a><Button className = "mr-3" style={{backgroundColor: "#162353", border:"1px solid #162353"}}>SignIn</Button></a></Link>
                    <Link href = "/signup"><a><Button variant = "dark">Create account</Button></a></Link></div>}
                </Form>
                
                </Navbar.Collapse>
                
                </Navbar>
            </div>
            {children}
        </div>
       
    );
};

export default Layout;