import React from 'react';
import Markdown from 'react-markdown';
import gfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dracula} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import {render} from 'react-dom'

const renderers = {
  code: ({language, value}) => {
    return <SyntaxHighlighter style={dracula} language={language} children={value} />
  }
}

const Preview = ({showPreview ,contents, backToblog, title, coverPic}) => {
    return (
        <div className = "previewDiv" style={{display: (showPreview === true) ? "display" : "block", padding: "20px"}}>
            <img src={coverPic}/>
            <h3>{title}</h3>
            <Markdown renderers = {renderers} plugins = {[gfm]}>{contents}</Markdown>
        </div>
    );
};

export default Preview;