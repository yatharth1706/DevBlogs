import React, { useEffect, useState } from 'react';
import {useAuth} from '../contexts/AuthProvider';
import {useRouter} from 'next/router';
import {db} from '../config/firebase.config';
import { ThemeProvider, Card, CardImg, Button, FormControl, FormLabel, Form } from 'react-bootstrap';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

const Dashboard = () => {
    const {currUser} = useAuth();
    const router = useRouter();
    const [blogs,setBlogs] = useState([]);

    useEffect(() => {
        if(!currUser){
            router.push("/login");            
        }
        let temp = [];
        db.collection('blogs').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                temp.push(doc.data());
            })
            setBlogs(temp);
        })
    }, [])

    return (
        <div style={{width:"100%", height: "auto", display :"flex"}}>
            <div className = "mt-3 d-flex" style={{flexWrap : "wrap", width: "77%"}}>
            {blogs.map((blog) => <Card style={{width: "32rem", margin: "20px 20px"}}>
                <Card.Body>
                    <Card.Img variant = "top" src = {blog.coverPic} width = "400" height = "300"/>
                    <Card.Text className = "mt-2">{blog.blog.substr(0,22)}.....</Card.Text>
                        <div style={{display : "flex" , justifyContent : "space-between"}}>
                            <Button style={{backgroundColor:"#5952cb"}}>View More</Button>
                            <div>
                            <FavoriteBorderIcon />
                            <BookmarkBorderIcon />
                            </div>
                        </div>
                    </Card.Body>
                </Card>)}
            </div>
            <div style={{width:"20%", marginTop : "35px"}}>
                <Card style={{width:"18rem"}}>
                    <Card.Header style={{backgroundColor : "#5952cb", color: "white"}}>Filters</Card.Header>
                    <Card.Body>
                    <Form.Check type="checkbox" label="JavaScript" />
                    <Form.Check type="checkbox" label="Firebase" />
                    <Form.Check type="checkbox" label=".Net" />
                    <Form.Check type="checkbox" label="CSS" />
                    <Form.Check type="checkbox" label="GraphQL" />
                    <Form.Check type="checkbox" label="React" />
                    <Form.Check type="checkbox" label="Angular" />
                    <Button style={{backgroundColor: "#5952cb"}} className = "mt-3 w-100">Apply</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;

