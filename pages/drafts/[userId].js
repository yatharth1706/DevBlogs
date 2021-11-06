import React from "react";
import { FormControl, Button } from "react-bootstrap";
import Moment from "moment";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Link from "next/link";
import { db } from "../../config/firebase.config";

function Drafts({ posts }) {
  return (
    <div className="w-full px-4 mt-8">
      <section className="pt-2">
        <h5 className="text-lg mb-4">All Drafts</h5>
        {posts && posts.filter((post) => post.type === "Draft").length === 0 && (
          <span className="text-xs">No drafts yet</span>
        )}
        {posts.map(
          (post) =>
            post.type &&
            post.type === "Draft" && (
              <Link href={"/blog/draft/" + post.id}>
                <div
                  key={post.title}
                  className="flex flex-col shadow h-auto w-full mb-8 rounded cursor-pointer"
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
                      <span>{post.createdBy}</span>
                      <span>
                        <FavoriteBorderIcon />
                        <BookmarkBorderIcon />
                      </span>
                    </div>
                  </article>
                </div>
              </Link>
            )
        )}
      </section>
    </div>
  );
}

export async function getStaticProps(context) {
  const { userId } = context.params;

  const querySnapshot = await db.collection("blogs").get();
  let posts = [];
  querySnapshot.forEach((doc) => {
    if ((doc.data().userId = userId)) {
      posts.push({ id: doc.id, ...doc.data() });
    }
  });

  return {
    props: { posts },
    revalidate: 3,
  };
}

export async function getStaticPaths() {
  let blogs = await db.collection("blogs").get();

  let postPaths = [];
  blogs.forEach((doc) => postPaths.push({ params: { userId: doc.data().userId } }));
  console.log(postPaths);

  return {
    paths: postPaths,
    fallback: true,
  };
}

export default Drafts;
