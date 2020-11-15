import React from 'react';

const Preview = ({showPreview ,contents, backToblog, title, coverPic}) => {
    return (
        <div style={{display: (showPreview === true) ? "display" : "block", width: "80%",height: "auto", padding: "30px"}}>
            <img src={coverPic}/>
            <h3>{title}</h3>
            <div dangerouslySetInnerHTML = {{ __html : contents}}></div>
        </div>
    );
};

export default Preview;