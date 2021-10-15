import React, { useState, useEffect } from "react";
import { Card, Button, Form, FormGroup, FormControl, Navbar, Nav, Spinner } from "react-bootstrap";
import Suneditor from "suneditor-react";
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
          <div style={{ width: "100%", height: "auto", display: "flex" }}>
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
              <div style={{ width: "85%", height: "auto", padding: "30px" }}>
                <Card style={{ width: "100%", margin: "0 auto" }}>
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
                            <Button
                              variant="dark"
                              onClick={() => {
                                setCoverPic("");
                                setCoverFile();
                              }}
                            >
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

                        {!coverFile && (
                          <FormControl type="text" disabled={true} value={props.blog.coverPic} />
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
                width: "15%",
                height: "100%",
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
              <Button
                className="mb-3"
                style={{ backgroundColor: "#5952CB" }}
                onClick={() => publishBlog("Final")}
              >
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
