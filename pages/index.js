import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../layouts/layout';
import {useAuth} from '../contexts/AuthProvider';
import {useRouter} from 'next/router';
import { useState, useEffect } from 'react';
import {Form, Spinner} from 'react-bootstrap';
import LoginIcon from '@material-ui/icons/VpnKey';
import SignupIcon from '@material-ui/icons/SupervisorAccount';
import TagIcon from '@material-ui/icons/LocalOffer';
import FAQIcon from '@material-ui/icons/QuestionAnswer';
import InfoIcon from '@material-ui/icons/Info';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import {db} from '../config/firebase.config';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Input} from '@material-ui/core';
import {FormControl, Button} from 'react-bootstrap';
import Moment from 'moment';
import Markdown from 'react-markdown';
import gfm from 'remark-gfm';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Link from 'next/link';
import UserProfile from '../components/Modal/UserProfile';

export default function Home({posts}) {
    const {currUser} = useAuth();
    const [userInfo, setUserInfo] = useState();
    const defaultPic = "https://t3.ftcdn.net/jpg/02/10/49/86/360_F_210498655_ywivjjUe6cgyt52n4BxktRgDCfFg8lKx.jpg";
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        db.collection("users").doc(currUser.uid).get().then((doc) => setUserInfo(doc.data()))
        
    },[])

    useEffect(() => {
        console.log(userInfo)
    }, [userInfo])

    return (
           <div className = "homepage-container">
               <div className = "sidebar">
                   {currUser && <div style={{display : "flex", lineHeight : "40px", border: "1px solid white", borderBottomColor : "lightgray" , marginBottom : "20px"}} className = "profilePicHolder" onClick = {() => setModalShow(true)}>
                    {userInfo && <><img src = {userInfo.profilePic.trim()!=='' ? userInfo.profilePic : defaultPic} style={{width: "40px" ,height: "40px", borderRadius : "50%", marginRight : "10px"}} alt = "profile pic"/> <span>{userInfo.displayName}</span></>}
                    </div>}
                    {currUser ? <></>: <>
                        <div className = "sidebar-link"><LoginIcon />Sign in</div>
                    <div className = "sidebar-link"><SignupIcon />Create an account</div></>}
                    <div className = "sidebar-link"><TagIcon />Tags</div>
                    <div className = "sidebar-link"><FAQIcon/>FAQ</div>
                    <div className = "sidebar-link"><InfoIcon/>About</div>
                    <div className = "sidebar-link"><ContactSupportIcon/>Contact</div>
               </div>
               <div className = "blogs-container" style={{display :"flex", flexDirection : "column"}}>
                    <div className = "d-flex mb-3">
                        <FormControl style={{width: "70%", marginRight : "10px"}} type = "text" placeholder = "Search any blog here"/>
                        <Button style={{backgroundColor : "#162353"}}>Search</Button>
                    </div>
                    <section>
                        <h5>All Blogs</h5>
                        {posts.map((post) => <div key = {post.title} style={{width: "760px", height: "auto", display : "flex", flexDirection : "column", boxShadow : "2px 2px 10px #B2B2B2", marginBottom : "40px"}}>
                        <img src= {post.coverPic} alt = "blog cover pic" width = "100%" height = "450px" style={{objectFit : "center"}} />
                        <article style={{padding: "20px"}}>
                            <span style={{fontSize : "13px"}}>{Moment(post.createdAt).format('MMMM Do YYYY, h:mm')}</span>
                            <h3 className = "mt-2" style={{fontWeight : "bold"}}>{post.title}</h3>
                            <p className = "mt-2">{post.blog.substr(0,40)}.......</p>
                            <div>
                                <span style={{marginRight : "10px", color: "green"}}>#js</span> <span style={{marginRight : "10px", color: "red"}}>#reactjs</span> <span style={{color: "green"}}>#nextjs</span>
                            </div>
                            <div style={{display: "flex", justifyContent : "space-between", marginTop : "10px"}}>
                                <span>{post.user}</span>
                                <span><FavoriteBorderIcon /><BookmarkBorderIcon /></span>
                            </div>
                        </article>
                        </div>)}
                    </section>
               </div>
               <UserProfile show = {modalShow} onHide = {() => setModalShow(false)} userInfo = {userInfo} defaultPic = {defaultPic}/>
           </div>
       
    )
}

export async function getStaticProps() {
    
    const querySnapshot = await db.collection("blogs").get();
    let posts = []
    querySnapshot.forEach((doc) => posts.push(doc.data()));

    return {
        props : {posts},
        revalidate : 3
    }
}