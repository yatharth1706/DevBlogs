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


export default function Home({posts}) {
    const {currUser} = useAuth();
  
    return (
           <div className = "homepage-container">
               <div className = "sidebar">
                    <div className = "sidebar-link"><LoginIcon />Sign in</div>
                    <div className = "sidebar-link"><SignupIcon />Create an account</div>
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
                        {posts.map((post) => <div key = {post.title} style={{width: "760px", height: "auto", display : "flex", flexDirection : "column", boxShadow : "10px 10px 20px lightgray", marginBottom : "40px"}}>
                        <img src= {post.coverPic} alt = "blog cover pic" width = "100%" height = "450px" style={{objectFit : "center"}} />
                        <article style={{padding: "10px"}}>
                            <span style={{fontSize : "13px"}}>{Moment(post.createdAt).format('MMMM Do YYYY, h:mm')}</span>
                            <h3 className = "mt-3" style={{fontWeight : "bold"}}>{post.title}</h3>
                            <span style={{marginTop :"20px", marginRight : "10px", color: "green"}}>#js</span> <span style={{marginTop :"20px", marginRight : "10px", color: "red"}}>#reactjs</span> <span style={{marginTop : "20px", color: "green"}}>#nextjs</span>
                        </article>
                        </div>)}
                    </section>
               </div>
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