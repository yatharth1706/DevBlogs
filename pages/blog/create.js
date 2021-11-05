import React, { useEffect, useState, useRef } from "react";
import { Card, button, Form, FormGroup, FormControl, Navbar, Nav, Spinner } from "react-bootstrap";
import Suneditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthProvider";
import withPrivateRoute from "../../components/withPrivateRoute";
import Preview from "../../components/Preview";
import { storage, db } from "../../config/firebase.config";

const PostCreate = () => {
  const { currUser } = useAuth();
  const [title, saveTitle] = useState("");
  const [coverFile, setCoverFile] = useState();
  const [blogValue, setBlogValue] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isInteractingWithDatabase, setIsInteractingWithDatabase] = useState(false);
  const [preview, setPreview] = useState(false);
  const [coverPic, setCoverPic] = useState("");

  useEffect(() => {
    if (!currUser) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  });

  useEffect(() => {
    console.log(currUser);
  }, [currUser]);

  const saveDraft = () => {};
  const seePreview = () => {
    setPreview(true);
  };

  const publishBlog = (typ = "Final") => {
    saveBannerPicInFireStore(typ);
  };

  const saveBannerPicInFireStore = (typ) => {
    console.log(coverFile);
    const reference = storage().ref();
    const file = coverFile;
    const name = new Date() + "-" + file.name;
    setIsInteractingWithDatabase(true);
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
        Task.snapshot.ref
          .getDownloadURL()
          .then((downloadURL) => {
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
              .add(toStore)
              .then(() => {
                setIsInteractingWithDatabase(false);
                router.push("/");
              })
              .catch((err) => {
                alert(err);
                setIsInteractingWithDatabase(false);
              });
          })
          .catch((err) => {
            alert(err);
            setIsInteractingWithDatabase(false);
          });
      }
    );
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
          <div style={{ width: "100%", height: "auto", display: "flex" }}>
            {preview ? (
              <Preview
                showPreview={preview}
                contents={blogValue}
                backToblog={backToblog}
                title={title}
                coverPic={coverPic}
              />
            ) : (
              <div className="flex shadow w-full mt-8 ml-2 p-8">
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
                            <button variant="dark" onClick={() => setCoverPic("")}>
                              Remove
                            </button>
                            <Form.File
                              id="coverPicFileChooser2"
                              style={{
                                border: "1px solid lightgray",
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
                            style={{ border: "1px solid lightgray", padding: "10px" }}
                            onChange={saveCoverPic}
                            placeholder="asdf"
                          />
                        )}
                      </div>
                      <div className="flex flex-col mb-2">
                        <label className="mb-1">Blog</label>
                        <textarea
                          rows="10"
                          onChange={handleChange}
                          value={blogValue}
                          className="border outline-none p-2 rounded"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
            <div
              className="sidebar mt-1"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "30px",
                width: "15%",
                height: "100%",
                position: "absolute",
                right: 0,
              }}
            >
              <button
                className="mb-4"
                style={{ backgroundColor: "#5952CB" }}
                onClick={preview ? backToblog : seePreview}
              >
                {preview ? "Back" : "Preview"}
              </button>
              <button
                className="mb-3"
                style={{ backgroundColor: "#5952CB" }}
                onClick={() => publishBlog("Final")}
              >
                Publish
              </button>
              <p className="text-center">Or</p>
              <button variant="dark" onClick={() => publishBlog("Draft")}>
                Save as draft
              </button>
            </div>
          </div>
        </>
      ) : (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </>
  );
};

export default PostCreate;
