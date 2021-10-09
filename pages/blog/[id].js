import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Moment from "moment";
import { db } from "./../../config/firebase.config";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

const renderers = {
  code: ({ language, value }) => {
    return <SyntaxHighlighter style={dracula} language={language} children={value} />;
  },
};

function BlogPage({ blog }) {
  const [blogInfo, setBlogInfo] = useState({});
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  useEffect(() => {
    getBlogData();
  }, []);

  const getBlogData = async () => {
    console.log("Blogs");
    db.collection("blogs")
      .doc(id)
      .get()
      .then((doc) => {
        console.log("blog info");
        setBlogInfo(doc.data());
      });
  };

  return blogInfo ? (
    <div
      className="py-10 px-8 mx-auto mt-0 shadow z-10"
      style={{
        width: "90%",
        height: "auto",
      }}
    >
      <div className="w-full" style={{ height: "500px" }}>
        <img src={blogInfo.coverPic} className="w-full h-full object-cover" />
      </div>
      <h3 className="font-bold text-6xl mt-5 mb-4">{blogInfo.title}</h3>
      <Markdown renderers={renderers} plugins={[gfm]}>
        {blogInfo.blog}
      </Markdown>
      <span>{Moment(blogInfo.createdAt).format("MMMM Do YYYY, h:mm")}</span>
      <br />
      <span className="font-bold">{blogInfo.user}</span>
    </div>
  ) : (
    <></>
  );
}

export default BlogPage;
