import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../layouts/layout';

export default function Dashboard() {
  return (
    <div className="container-fluid hero-big-container">
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
    </div>
  )
}
