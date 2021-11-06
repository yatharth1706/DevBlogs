import React from "react";
import InstaIcon from "@material-ui/icons/Instagram";
import GithubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";

function contact() {
  return (
    <div className="w-full px-4 mt-8">
      <h5>Contact</h5>
      <div className="flex flex-col justify-center items-center">
        <div className="w-40 h-40 rounded-full mt-4">
          <img
            className="w-full h-full object-cover object-left rounded-full"
            src="https://yatharth-portfolio.vercel.app/static/media/MyPhoto.087402b1.jfif"
          />
        </div>
        <div className="mt-4 text-center">
          Hello, I am Yatharth Verma Currently, I am working as SDE in LeadSquared, Bangalore. I
          love web development. I did my graduation from Lovely Professional University
        </div>
      </div>
      <div className="flex space-x-4 mt-4 justify-center">
        <div>
          <a href="http://github.com/yatharth1706" target="_blank">
            {" "}
            <GithubIcon />
          </a>
        </div>

        <div>
          <a href="http://github.com/yatharth1706" target="_blank">
            <TwitterIcon />
          </a>
        </div>

        <div>
          <a href="http://github.com/yatharth1706" target="_blank">
            <InstaIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

export default contact;
