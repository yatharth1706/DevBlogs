import React from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthProvider';
import {useRouter} from 'next/router';
import {Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Link from 'next/link';

const Layout = ({children}) => {
    const {currUser, logout} = useAuth();
    const router = useRouter();

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
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
                    {currUser ? <Button style={{backgrountColor : "#162353"}} onClick = {handleLogout}>Logout</Button> : <div><Button className = "mr-3" style={{backgroundColor: "#162353", border:"1px solid #162353"}}>SignIn</Button>
                    <Button variant = "dark">Create account</Button></div>}
                </Form>
                
                </Navbar.Collapse>
                
                </Navbar>
            </div>
            {children}
        </div>
       
    );
};

export default Layout;