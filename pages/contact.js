import React from "react";
import InstaIcon from "@material-ui/icons/Instagram";
import GithubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";

function contact() {
  return (
    <div style={{ paddingTop: "14px", width: "80%" }}>
      <h5>Contact</h5>
      <div className="flex mt-4 space-x-4">
        <a href="http://github.com/yatharth1706" target="_blank">
          <div className="shadow h-20 px-3 py-4 mb-4 cursor-pointer" style={{ width: "370px" }}>
            <GithubIcon />
            <span className="ml-2 font-semibold">Username: </span>
            <span>yatharth1706</span>
          </div>
        </a>
        <a href="https://twitter.com/yatharth170699" target="_blank">
          <div className="shadow h-20 px-3 py-4 mb-4 cursor-pointer" style={{ width: "370px" }}>
            <TwitterIcon />
            <span className="ml-2 font-semibold">Username: </span>
            <span>yatharth170699</span>
          </div>
        </a>

        <a href="https://instagram.com/web_dev_yatharth" target="_blank">
          <div className="shadow h-20 px-3 py-4 mb-4 cursor-pointer" style={{ width: "370px" }}>
            <InstaIcon />
            <span className="ml-2 font-semibold">Username: </span>
            <span>web_dev_yatharth</span>
          </div>
        </a>
      </div>
    </div>
  );
}

export default contact;
