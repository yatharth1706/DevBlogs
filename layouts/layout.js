import React from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {Link} from 'next/link';
import {useAuth} from '../contexts/AuthProvider';
import {useRouter} from 'next/router';

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
            <Navbar collapseOnSelect className = "nav-color-custom" expand="lg"  variant = "dark">
                <Navbar.Brand style={{paddingTop : ".1025rem"}}>DevBlogs</Navbar.Brand>
                <Navbar.Toggle />
            <Navbar.Collapse>
            <Nav className = "mr-auto">
                <Nav.Link as={Link} href="/">Home</Nav.Link>
                <Nav.Link href="/contribute">Contribute</Nav.Link>
                <Nav.Link href = "/posts/create">Create Blog</Nav.Link>
                {currUser ? <Button variant = "light" className = "ml-1" onClick = {handleLogout}>Logout</Button>  : <NavDropdown title="Signup / Login">
                    <NavDropdown.Item href = "/login">Login</NavDropdown.Item>
                    <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
                </NavDropdown>}
             </Nav>
             
             <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-light">Search</Button>
            </Form>
             
            </Navbar.Collapse>
            
            </Navbar>

            {children}
        </div>
       
    );
};

export default Layout;