import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useAuth } from "../contexts/AuthProvider";
import { useState, useEffect } from "react";
import { db } from "../config/firebase.config";
import { FormControl, Button } from "react-bootstrap";
import Moment from "moment";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Link from "next/link";

export default function Home({ posts }) {
  const [currentSelectedNav, setCurrentSelectedNav] = useState("AllBlogs");
  const [userInfo, setUserInfo] = useState();
  const { currUser, logout } = useAuth();

  useEffect(() => {
    if (currUser) {
      db.collection("users")
        .doc(currUser.uid)
        .get()
        .then((doc) => {
          console.log("User info");
          setUserInfo(doc.data());
        });
    }
  }, [currUser]);

  return (
    <div style={{ paddingTop: "14px", paddingLeft: "30px" }}>
      <div className="blogs-container" style={{ display: "flex", flexDirection: "column" }}>
        <div className="d-flex mb-3">
          <FormControl
            style={{ width: "70%", marginRight: "10px" }}
            type="text"
            placeholder="Search any blog here"
          />
          <Button style={{ backgroundColor: "#162353" }}>Search</Button>
        </div>
        <section>
          <h5>All Blogs</h5>
          {posts.map(
            (post) =>
              ((post.type && post.type !== "Draft") || !post.type) && (
                <Link href={"/blog/" + post.id}>
                  <div
                    key={post.title}
                    style={{
                      width: "760px",
                      height: "auto",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: "2px 2px 10px #B2B2B2",
                      marginBottom: "40px",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={post.coverPic}
                      alt="blog cover pic"
                      width="100%"
                      height="450px"
                      style={{ objectFit: "center" }}
                    />
                    <article style={{ padding: "20px" }}>
                      <span style={{ fontSize: "13px" }}>
                        {Moment(post.createdAt).format("MMMM Do YYYY, h:mm")}
                      </span>
                      <h3 className="mt-2" style={{ fontWeight: "bold" }}>
                        {post.title}
                      </h3>
                      <p className="mt-2">{post.blog.substr(0, 80)}.......</p>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "10px",
                        }}
                      >
                        <span>
                          <b>{post.createdBy}</b>
                        </span>
                        {/* <span>
                            <FavoriteBorderIcon />
                            <BookmarkBorderIcon />
                          </span> */}
                      </div>
                    </article>
                  </div>
                </Link>
              )
          )}
        </section>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const querySnapshot = await db.collection("blogs").get();
  let posts = [];
  querySnapshot.forEach((doc) => posts.push({ id: doc.id, ...doc.data() }));

  return {
    props: { posts },
    revalidate: 3,
  };
}
