import React, { useEffect, useState, useRef } from "react";
import { Card, Button, Form, FormGroup, FormControl, Navbar, Nav, Spinner } from "react-bootstrap";
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
  const [preview, setPreview] = useState(false);
  const [coverPic, setCoverPic] = useState("");

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

  const publishBlog = (type = "Final") => {
    saveBannerPicInFireStore(type);
  };

  const saveBannerPicInFireStore = (type) => {
    console.log(coverFile);
    const reference = storage().ref();
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
            user: currUser.email,
            type: type,
          };

          db.collection("blogs")
            .add(toStore)
            .then(() => {
              router.push("/");
            });
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
          <Navbar
            bg="light"
            style={{ backgroundColor: "#f0f3f3", boxShadow: "10px 2px 10px lightgray" }}
          >
            <Button variant="light">
              <img src="/img/left.png" width={20} height={20} />
            </Button>
          </Navbar>
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
              <div style={{ width: "80%", height: "auto", padding: "30px" }}>
                <Card style={{ width: "80%", margin: "0 auto" }}>
                  <Card.Body>
                    <Form>
                      <FormGroup>
                        <Form.Label>Title</Form.Label>
                        <FormControl
                          type="text"
                          placeholder="Enter title of your blog"
                          onChange={setTitle}
                          value={title}
                        />
                      </FormGroup>
                      <Form.Group>
                        <Form.Label>Cover Image</Form.Label>
                        <br />
                        {coverPic ? (
                          <>
                            <Button
                              className="mr-3"
                              style={{ backgroundColor: "#5952cb" }}
                              onClick={changeCoverPic}
                            >
                              Change
                            </Button>
                            <Button variant="dark" onClick={() => setCoverPic("")}>
                              Remove
                            </Button>
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
                      </Form.Group>
                      <FormGroup>
                        <Form.Label>Blog</Form.Label>
                        <FormControl
                          as="textarea"
                          rows={15}
                          onChange={handleChange}
                          value={blogValue}
                        />
                      </FormGroup>
                    </Form>
                  </Card.Body>
                </Card>
              </div>
            )}
            <div
              className="sidebar mt-1"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "30px",
                width: "20%",
                height: "100%",
                backgroundColor: "rgb(249,250,250)",
                position: "absolute",
                right: 0,
              }}
            >
              <Button
                className="mb-4"
                style={{ backgroundColor: "#5952CB" }}
                onClick={preview ? backToblog : seePreview}
              >
                {preview ? "Back" : "Preview"}
              </Button>
              <Button className="mb-3" style={{ backgroundColor: "#5952CB" }} onClick={publishBlog}>
                Publish
              </Button>
              <p className="text-center">Or</p>
              <Button variant="dark" onClick={() => publishBlog("Draft")}>
                Save as draft
              </Button>
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
