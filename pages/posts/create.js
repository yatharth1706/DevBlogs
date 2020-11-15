import React, {useEffect, useState, useRef} from 'react';
import {Card, Button, Form, FormGroup, FormControl, Navbar, Nav, Spinner} from 'react-bootstrap';
import Suneditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {useAuth} from '../../contexts/AuthProvider';
import withPrivateRoute from '../../components/withPrivateRoute';
import Preview from '../../components/Preview';

const PostCreate = () => {
    const {currUser} = useAuth();
    const [title, saveTitle] = useState('');
    const [blogValue, setBlogValue] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [preview, setPreview] = useState(false);
    const [coverPic, setCoverPic] = useState('');

    useEffect(() => {
        if(!currUser){
            router.push("/login");
        }else{
            setLoading(false);
        }
    })
    
    const saveDraft = () => {

    }
    const seePreview = () => {
        setPreview(true);
    }

    const publishBlog = () => {
        console.log(blogValue);
    }

    const handleChange = (e) => {
        setBlogValue(e.target.value);
    }

    const backToblog = () => {
        setPreview(false);
    }

    const setTitle = (e) => {
        saveTitle(e.target.value);
    }

    const saveCoverPic = (e) =>{
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (e) => {
            setCoverPic(reader.result);
            console.log(reader.result);
        }
    }

    return (
        <>
        <Head>
            <title>Create Blog</title>
        </Head>
        {loading === false ? <><Navbar bg="light" style={{backgroundColor : "#f0f3f3", boxShadow : "10px 2px 10px lightgray"}} >
            <Button variant = "light"><img src = "/img/left.png" width={20} height = {20}/></Button>
            <Nav className = "ml-auto">
                <Button variant = "light">Actions</Button>
            </Nav>
        </Navbar>
        <div style={{width: "100%", height:"700px", display : "flex"}}>
        {preview ? <Preview showPreview = {preview} contents = {blogValue} backToblog = {backToblog} title = {title} coverPic = {coverPic}/> : <div style={{width: "80%",height: "auto", padding: "30px"}}>
            <Card style={{width: "80%", margin: "0 auto"}}>
                <Card.Body>
                    <Form>
                        <FormGroup>
                            <Form.Label>Title</Form.Label>
                            <FormControl type="text" placeholder = "Enter title of your blog" onChange = {setTitle} value = {title}/>
                        </FormGroup>
                        <Form.Group>
                            <Form.Label>Cover Image</Form.Label>
                            <Form.File id="exampleFormControlFile1"  style={{border : "1px solid lightgray", padding:"10px"}} onChange = {saveCoverPic} placeholder="asdf"/>
                        </Form.Group>
                        <FormGroup>
                            <Form.Label>Blog</Form.Label>
                            <FormControl as="textarea" rows = {15} onChange = {handleChange} value={blogValue}/>
                        </FormGroup>
                    </Form>
                </Card.Body>
            </Card>
        </div>}
        <div className = "sidebar" style={{display : "flex",flexDirection : "column", padding: "30px", width: "20%", height: "100%", backgroundColor: "rgb(249,250,250)", boxShadow : "-2px 0px 10px lightgray"}}>
                            <Button className = "mb-4" style={{backgroundColor : "#5952CB"}} onClick = {preview ? backToblog : seePreview}>{preview ? "Back" : "Preview"}</Button>
            <Button className = "mb-3" style = {{backgroundColor : "#5952CB"}} onClick = {publishBlog} >Publish</Button>
            <p className = "text-center">Or</p>
            <Button variant = "dark" onClick = {saveDraft}>Save as draft</Button>
        </div>
    </div>
    </> : <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
        </Spinner>}
    </>
    );
};

export default PostCreate;