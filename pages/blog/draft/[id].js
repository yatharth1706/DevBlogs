import React, { useState, useEffect } from "react";
import Suneditor from "suneditor-react";
import { Form, FormControl } from "react-bootstrap";
import "suneditor/dist/css/suneditor.min.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../../../contexts/AuthProvider";
import withPrivateRoute from "../../../components/withPrivateRoute";
import Preview from "../../../components/Preview";
import { storage, db } from "../../../config/firebase.config";

function Drafts(props) {
  const { currUser } = useAuth();
  const [title, saveTitle] = useState(props.blog.title);
  const [coverFile, setCoverFile] = useState();
  const [blogValue, setBlogValue] = useState(props.blog.blog);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(false);
  const [coverPic, setCoverPic] = useState("");

  const { id } = router.query;

  useEffect(() => {
    if (!currUser) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  });

  const saveDraft = () => {};
  const seePreview = () => {
    setPreview(true);
  };

  const publishBlog = (typ = "Final") => {
    saveBannerPicInFireStore(typ);
  };

  const saveBannerPicInFireStore = (typ) => {
    const reference = storage().ref();
    if (coverFile) {
      const file = coverFile;
      const name = new Date() + "-" + file.name;

      const metadata = {
        contentType: file.type,
      };

      const Task = reference.child(name).put(file, metadata);

      Task.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          Task.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            // now store all data in firestore
            const toStore = {
              title,
              coverPic: downloadURL,
              blog: blogValue,
              createdAt: new Date().toString(),
              createdBy: currUser.email,
              type: typ,
              userId: currUser.uid,
            };

            console.log(toStore);

            db.collection("blogs")
              .doc(id)
              .update(toStore)
              .then(() => {
                router.push("/");
              });
          });
        }
      );
    } else {
      const toStore = {
        title,
        coverPic: props.blog.coverPic ? props.blog.coverPic : "",
        blog: blogValue,
        createdAt: new Date().toString(),
        createdBy: currUser.email,
        type: typ,
        userId: currUser.uid,
      };
      console.log(toStore);

      db.collection("blogs")
        .doc(id)
        .update(toStore)
        .then(() => {
          router.push("/");
        });
    }
  };

  const handleChange = (e) => {
    setBlogValue(e.target.value);
  };

  const backToblog = () => {
    setPreview(false);
  };

  const setTitle = (e) => {
    saveTitle(e.target.value);
  };

  const saveCoverPic = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    setCoverFile(e.target.files[0]);
    reader.onload = (e) => {
      setCoverPic(reader.result);
    };
  };

  const changeCoverPic = () => {
    document.getElementById("coverPicFileChooser2").click();
  };

  return (
    <>
      <Head>
        <title>Create Blog</title>
      </Head>
      {loading === false ? (
        <>
          <div style={{ width: "100%", height: "auto" }} className="flex flex-col">
            {preview ? (
              <Preview
                showPreview={preview}
                contents={blogValue}
                backToblog={backToblog}
                title={title}
                coverPic={coverPic}
                coverPicURL={props.blog.coverPic}
              />
            ) : (
              <div className="flex shadow mt-8 ml-2 p-8 w-full">
                <div style={{ width: "100%", margin: "0 auto" }}>
                  <div>
                    <form>
                      <div className="flex flex-col mb-2">
                        <label className="mb-1">Title</label>
                        <input
                          type="text"
                          placeholder="Enter title of your blog"
                          onChange={setTitle}
                          value={title}
                          className="border outline-none p-2 rounded"
                        />
                      </div>
                      <div className="flex flex-col mb-2">
                        <label className="mb-1">Cover Image</label>
                        {coverPic ? (
                          <>
                            <button
                              className="mr-3"
                              style={{ backgroundColor: "#5952cb" }}
                              onClick={changeCoverPic}
                            >
                              Change
                            </button>
                            <button
                              variant="dark"
                              onClick={() => {
                                setCoverPic("");
                                setCoverFile();
                              }}
                            >
                              Remove
                            </button>
                            <Form.File
                              id="coverPicFileChooser2"
                              style={{
                                border: "1px solid #e7e7e7",
                                padding: "10px",
                                display: "none",
                              }}
                              onChange={saveCoverPic}
                              placeholder="asdf"
                            />
                          </>
                        ) : (
                          <Form.File
                            id="coverPicFileChooser1"
                            style={{ border: "1px solid #e7e7e7", padding: "10px" }}
                            onChange={saveCoverPic}
                            placeholder="asdf"
                          />
                        )}

                        {!coverFile && (
                          <input
                            className="border outline-none p-2 rounded"
                            type="text"
                            disabled={true}
                            value={props.blog.coverPic}
                          />
                        )}
                      </div>
                      <div className="flex flex-col mb-2">
                        <label className="mb-1">Blog</label>

                        <textarea
                          className="border outline-none p-2 rounded"
                          rows="15"
                          onChange={handleChange}
                          value={blogValue}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
            <div className="w-full mt-1 flex space-x-3 p-2">
              <button
                className="text-white rounded p-2"
                style={{ backgroundColor: "#5952CB" }}
                onClick={preview ? backToblog : seePreview}
              >
                {preview ? "Back" : "Preview"}
              </button>
              <button
                className="text-white rounded p-2"
                style={{ backgroundColor: "#5952CB" }}
                onClick={() => publishBlog("Final")}
              >
                Publish
              </button>
              <p className="text-center mt-2">Or</p>
              <button
                className="bg-gray-100 p-2 rounded"
                variant="dark"
                onClick={() => publishBlog("Draft")}
              >
                Save as draft
              </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export async function getStaticProps(context) {
  let { id } = context.params;
  console.log(id);
  let blog = {};
  console.log("get static props");
  /** Get post from database whose id matches with params id */
  let post = await db
    .collection("blogs")
    .doc(id)
    .get()
    .then((doc) => {
      blog = doc.data();
    });

  return {
    props: {
      blog,
    },
  };
}

export async function getStaticPaths() {
  let blogs = await db.collection("blogs").get();

  let postPaths = [];
  blogs.forEach((doc) => postPaths.push({ params: { id: doc.id } }));

  return {
    paths: postPaths,
    fallback: false,
  };
}

export default Drafts;
