import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../layouts/layout';
import {useAuth} from '../contexts/AuthProvider';
import {useRouter} from 'next/router';
import { useState, useEffect } from 'react';
import {Spinner} from 'react-bootstrap';

export default function Home() {
    const router = useRouter();
    const {currUser} = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(currUser){
            setLoading(false);
            router.push("/dashboard");
        }
        setLoading(false);
    },[])
  
    return (
        (loading === false) ? <div className="container-fluid hero-big-container">
        <div className="hero-container">
            <div className="hero-image">
                <img src="/img/first-image.svg" alt="First Image" />
                <img src="/img/second-image.svg" alt="Second Image" />
            </div>
            <div className ="hero-content">
                <h3>Dev Blogs at one place</h3>
                <p>Share your knowledge with Everyone!</p>

                <div className ="buttons-holder">
                    <input type="text" placeholder = "Enter Your Email" class="form-control" />
                    <button className ="btn btn-danger">Subscribe</button>
                </div>
            </div>
        </div>
    </div> : <Spinner animation="border" role="status">
         <span className="sr-only">Loading...</span>
    </Spinner>
    )
}
