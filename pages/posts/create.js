import React from 'react';
import {Card, Button, Form, FormGroup, FormControl, Navbar, Nav} from 'react-bootstrap';
import Suneditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const PostCreate = () => {
    return (
        <>
        <Navbar bg="light" style={{backgroundColor : "#f0f3f3", boxShadow : "10px 2px 10px lightgray"}} >
            <Button variant = "light"><img src = "/img/left.png" width={20} height = {20}/></Button>
            <Nav className = "ml-auto">
                <Button variant = "light">Actions</Button>
            </Nav>
        </Navbar>
        <div style={{width: "100%", height:"700px", display : "flex"}}>
            <div style={{width: "80%",height: "auto", padding: "30px"}}>
                <Card style={{width: "80%", margin: "0 auto"}}>
                    <Card.Body>
                        <Form>
                            <FormGroup>
                                <Form.Label>Title</Form.Label>
                                <FormControl type="text" placeholder = "Enter title of your blog" />
                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Blog</Form.Label>
                                <Suneditor lang="en" setOptions = {{
                                height: "400",                        
                                buttonList: [['template'],['undo','redo'],[ 'font','fontSize','formatBlock','align','bold','underline','italic'],
                            ['list'], ['image'],['video'],['link'],['table'],['horizontalRule'],
                            ['showBlocks'],['codeView'],['hiliteColor'],['fontColor'],['fullScreen']]	}} />
                            </FormGroup>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
            <div className = "sidebar" style={{display : "flex",flexDirection : "column", padding: "30px", width: "20%", height: "100%", backgroundColor: "rgb(249,250,250)", boxShadow : "-2px 0px 10px lightgray"}}>
                <Button className = "mb-4" style={{backgroundColor : "#5952CB"}}>Preview</Button>
                <Button className = "mb-3" style = {{backgroundColor : "#5952CB"}} >Publish</Button>
                <p className = "text-center">Or</p>
                <Button variant = "dark">Save as draft</Button>
            </div>
        </div>
        
        </>
    );
};

export default PostCreate;