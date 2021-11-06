import React from "react";

function about() {
  return (
    <div className="w-full h-auto px-8 mt-8">
      <h5>About</h5>
      <p>
        Welcome, to DevBlogs. Its actually a side project that I have built. In this website
        basically, you can write blogs. You can writer blogs using markdown language. You can also
        see the preview. When user writes the markdown, in preview that markdown is converted to
        HTML and user can see the generated blog. After that user can publish and share the blog
        with everyone. <br />
      </p>
      <p className="font-semibold">Tech stack used to build this website are as follows:</p>
      <ul>
        <li>- ReactJS: (Frontend)</li>
        <li>
          - Firebase: (Using firestore for uploading files and authentication for user management)
        </li>
      </ul>
      <p className="font-semibold">Author: Yatharth Verma</p>
    </div>
  );
}

export default about;
