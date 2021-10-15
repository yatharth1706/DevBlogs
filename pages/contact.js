import React from "react";
import InstaIcon from "@material-ui/icons/Instagram";
import GithubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";

function contact() {
  return (
    <div style={{ paddingTop: "14px", width: "80%", marginLeft: "10px" }}>
      <h5>Contact</h5>
      <div className="grid grid-cols-3 mt-4">
        <div className="shadow h-20 px-3 py-4 mb-2" style={{ width: "370px" }}>
          <GithubIcon />
          <a href="http://github.com/yatharth1706" target="_blank">
            <>
              {" "}
              <span className="ml-2 font-semibold">Username: </span>
              <span>yatharth1706</span>
            </>
          </a>
        </div>

        <div className="shadow h-20 px-3 py-4 mb-2" style={{ width: "370px" }}>
          <TwitterIcon />
          <a href="http://github.com/yatharth1706" target="_blank">
            <>
              <span className="ml-2 font-semibold">Username: </span>
              <span>yatharth170699</span>
            </>
          </a>
        </div>

        <div className="shadow h-20 px-3 py-4 mb-2 " style={{ width: "370px" }}>
          <InstaIcon />
          <a href="http://github.com/yatharth1706" target="_blank">
            <>
              <span className="ml-2 font-semibold">Username: </span>
              <span>web_dev_yatharth</span>
            </>
          </a>
        </div>
      </div>
    </div>
  );
}

export default contact;
