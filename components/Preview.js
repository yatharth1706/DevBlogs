import React from 'react';

const Preview = ({showPreview ,contents, backToblog, title}) => {
    return (
        <div style={{display: (showPreview === true) ? "display" : "block", width: "80%",height: "auto", padding: "30px"}}>
            <h3>Preview</h3>
            <h3>{title}</h3>
            <div dangerouslySetInnerHTML = {{ __html : contents}}></div>
        </div>
    );
};

export default Preview;