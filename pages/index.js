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
  const [searchValue, setSearchValue] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

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

  useEffect(() => {
    if (searchValue && searchValue.trim().length > 0) {
      filterBlogs();
    } else {
      setFilteredPosts([]);
    }
  }, [searchValue]);

  const filterBlogs = () => {
    let filtered_ones = posts.filter(
      (post) =>
        post.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        post.blog.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
    console.log(filtered_ones);
    setFilteredPosts(filtered_ones);
  };

  return (
    <div className="w-full px-8 py-4">
      <div className="w-full py-4">
        <div className="d-flex mb-3">
          <input
            className="border p-2 outline-none"
            style={{ width: "70%", marginRight: "10px" }}
            type="text"
            placeholder="Search any blog here"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <span
            className="cursor-pointer text-white rounded px-2 py-2 w-20"
            style={{ backgroundColor: "#162353" }}
          >
            Search
          </span>
        </div>
        <section className="py-2">
          <h5 className="mb-3">All Blogs</h5>
          <div>
            {filteredPosts.length > 0
              ? filteredPosts.map(
                  (post) =>
                    ((post.type && post.type !== "Draft") || !post.type) && (
                      <Link href={"/blog/" + post.id}>
                        <div
                          key={post.title}
                          className="flex flex-col shadow h-auto w-full mb-8 rounded"
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
                )
              : posts.map(
                  (post) =>
                    ((post.type && post.type !== "Draft") || !post.type) && (
                      <Link href={"/blog/" + post.id}>
                        <div
                          key={post.title}
                          className="flex flex-col shadow h-auto w-full mb-8 rounded"
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
          </div>
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
