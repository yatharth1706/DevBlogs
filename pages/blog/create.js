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
          <div style={{ width: "100%", height: "auto" }} className="flex flex-col">
            {preview ? (
              <Preview
                showPreview={preview}
                contents={blogValue}
                backToblog={backToblog}
                title={title}
                coverPic={coverPic}
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
                          <div className="flex space-x-2">
                            <button
                              className="mr-3 p-2 rounded text-white"
                              style={{ backgroundColor: "#5952cb" }}
                              onClick={changeCoverPic}
                            >
                              Change
                            </button>
                            <button
                              className="bg-gray-100 rounded p-2 "
                              variant="dark"
                              onClick={() => setCoverPic("")}
                            >
                              Remove
                            </button>
                            <Form.File
                              id="coverPicFileChooser2"
                              style={{
                                border: "1px solid #e8e8e8",
                                padding: "10px",
                                display: "none",
                              }}
                              onChange={saveCoverPic}
                              placeholder="asdf"
                            />
                          </div>
                        ) : (
                          <Form.File
                            id="coverPicFileChooser1"
                            style={{ border: "1px solid #e8e8e8", padding: "10px" }}
                            onChange={saveCoverPic}
                            placeholder="asdf"
                          />
                        )}
                      </div>
                      <div className="flex flex-col mb-2 ">
                        <label className="mb-1">Blog</label>
                        <textarea
                          rows="12"
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
              className="w-full mt-1 flex space-x-3 p-2"
              style={{
                height: "100%",
              }}
            >
              <button
                className="text-white rounded p-2"
                style={{ backgroundColor: "#5952CB" }}
                onClick={preview ? backToblog : seePreview}
              >
                {preview ? "Back" : "Preview"}
              </button>
              <button
                className=" p-2 rounded text-white"
                style={{ backgroundColor: "#5952CB" }}
                onClick={() => publishBlog("Final")}
              >
                Publish
              </button>

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
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </>
  );
};

export default PostCreate;
