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
        <div style={{height: "auto", padding: "30px", display: "flex", justifyContent : "center"}}>
            <Card>
            
                <Card.Body>
                    <Form>
                        <FormGroup>
                            <Form.Label>Title</Form.Label>
                            <FormControl type="text" placeholder = "Enter title of your blog" />
                        </FormGroup>
                        <Suneditor lang="en" setOptions = {{
                            height: "400",                        
                    buttonList: [['template'],['undo','redo'],
                          [ 'font','fontSize','formatBlock','align','bold','underline','italic'],
                          ['list'], ['image'],['video'],['link'],['table'],['horizontalRule'],
                          ['showBlocks'],['codeView'],['hiliteColor'],['fontColor'],['fullScreen']]	}} />
                    </Form>
                    <div style={{display : "flex", justifyContent : "space-between", padding: "10px 0px"}}>
                        <Button variant = "dark">Preview</Button>
                        <Button style={{backgroundColor : "#5952cb"}}>Create</Button>
                    </div>
                </Card.Body>
                
            </Card>
        </div>
        </>
    );
};

export default PostCreate;