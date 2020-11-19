import React from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {Link} from 'next/link';
import {useAuth} from '../contexts/AuthProvider';
import {useRouter} from 'next/router';
import {Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

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
            <Navbar collapseOnSelect className = "nav-color-custom" expand="lg"  variant = "light" sticky = "top">
                <Navbar.Brand style={{paddingTop : ".1025rem"}}>DevBlogs</Navbar.Brand>
                <Navbar.Toggle />
            <Navbar.Collapse>
            <Nav className = "mr-auto">
                {currUser ? <Nav.Link href = "/dashboard">Dashboard</Nav.Link> : <Nav.Link href="/">Home</Nav.Link>}
                <Nav.Link href="/contribute">Contribute</Nav.Link>
                {currUser ? <Button variant = "light" className = "ml-1" onClick = {handleLogout}>Logout</Button>  : <NavDropdown title="Signup / Login">
                    <NavDropdown.Item as={Link} href = "/login"><a>Login</a></NavDropdown.Item>
                    <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
                </NavDropdown>}
             </Nav>
             
             <Form inline>
                <Nav.Link href = "/posts/create"><a><Fab color="primary" aria-label="add" size = "small" className= "mr-2"><AddIcon /></Fab></a></Nav.Link>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-primary">Search</Button>
            </Form>
             
            </Navbar.Collapse>
            
            </Navbar>

            {children}
        </div>
       
    );
};

export default Layout;