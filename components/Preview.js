import React from "react";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { render } from "react-dom";

const renderers = {
  code: ({ language, value }) => {
    return <SyntaxHighlighter style={dracula} language={language} children={value} />;
  },
};

const Preview = ({ showPreview, contents, backToblog, title, coverPic }) => {
  return (
    <div
      className="p-10 shadow z-10"
      style={{
        display: showPreview === true ? "display" : "block",
        padding: "40px",
        width: "80%",
        height: "auto",
      }}
    >
      <div className="w-full" style={{ height: "500px" }}>
        <img src={coverPic} className="w-full h-full object-cover" />
      </div>
      <h3 className="font-bold text-6xl mt-5 mb-4">{title}</h3>
      <Markdown renderers={renderers} plugins={[gfm]}>
        {contents}
      </Markdown>
    </div>
  );
};

export default Preview;
