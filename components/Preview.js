import React from "react";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

const renderers = {
  code: ({ language, value }) => {
    return <SyntaxHighlighter style={dracula} language={language} children={value} />;
  },
};

const Preview = ({ showPreview, contents, backToblog, title, coverPic, coverPicURL }) => {
  return (
    <div
      className="mt-6 shadow z-1 ml-2 p-8"
      style={{
        display: showPreview === true ? "display" : "block",
        width: "100%",
        height: "auto",
      }}
    >
      <img src={coverPic || coverPicURL} className="w-full" />
      <h3 className="font-bold text-6xl mt-5 mb-4">{title}</h3>
      <Markdown renderers={renderers} plugins={[gfm]}>
        {contents}
      </Markdown>
    </div>
  );
};

export default Preview;
