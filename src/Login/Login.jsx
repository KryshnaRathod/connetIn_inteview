import React, { useState } from "react";
import "./login.css";
import imgSrc from "./images/img-2.png";
import RandomQuotes from "./RandomQuotes";
import videoSrc from "./videos/video-2-main.mp4";
import { useHistory } from "react-router-dom";
import { userDataSlice } from "../Store/userDataSlice";
import { useDispatch } from "react-redux";
import { SERVER_URL } from "../GlobalCommonData";

function Login() {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userPassword, setPassword] = useState("");
  let [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();
  const handleSignUp = () => {
    console.log("here");
    history.push("/signUp");
  };
  const handleLogin = () => {
    fetch(`${SERVER_URL}login`, {
      method: "POST",
      body: JSON.stringify({ userName: userName, password: userPassword }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.loginSuccess) {
          localStorage.setItem("authToken", res.authToken);
          console.log("auth token " + res.authToken);
          const payload = {
            userId: res.newUser._id,
            userName: res.newUser.userName,
            userEmail: res.newUser.userEmail,
            gitHubLink: res.newUser.gitHubLink,
            linkedInLink: res.newUser.linkedInLink,
            postsLiked: res.newUser.postsLiked,
            company: res.newUser.company,
            designation: res.newUser.designation,
            skills: res.newUser.skills,
            followers: res.newUser.followers,
            following: res.newUser.following,
            posts: res.newUser.posts,
          };
          dispatch(userDataSlice.actions.addUserData(payload));
          history.push("/home/" + res.newUser._id);
          setErrorMsg("");
        } else {
          //history.push("/home/1")
          setErrorMsg(res.errorMsg);
          console.log(res.errorMsg);
        }
      });
  };
  return (
    <div className="base-container">
      <video src={videoSrc} autoPlay loop muted />
      <div className="leftHandSide">
        <div className="imageDiv">
          <img className="image" src={imgSrc} alt="" />
        </div>
        <div className="loginBox">
          <div className="content">
            <div className="form">
              <div className="form-group">
                <label className="labelClass">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(evt) => {
                    setErrorMsg("");
                    setUserName(evt.target.value);
                  }}
                ></input>
              </div>
            </div>
            <div className="form">
              <div className="form-group">
                <label className="labelClass">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(evt) => {
                    setErrorMsg("");
                    setPassword(evt.target.value);
                  }}
                ></input>
              </div>
              <p className="errorMsg">{errorMsg}</p>
            </div>
          </div>
          <div className="btnDiv">
            <button type="button" className="btn" onClick={handleLogin}>
              Login
            </button>
            <button type="button" className="btn" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
          <div className="btnDiv">
            <button type="button" className="gitBtn">
              Sign in with Github<i className="fa fa-github"></i>
            </button>
          </div>
          <br />
        </div>
      </div>
      <div className="rightHandSide">
        <RandomQuotes />
      </div>
    </div>
  );
}

export default Login;
