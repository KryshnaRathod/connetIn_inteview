import React, { useState } from "react";
import "./login.css";
import imgSrc from "./images/img-2.png";
import RandomQuotes from "./RandomQuotes";
import videoSrc from "./videos/video-2-main.mp4";
import { useHistory } from "react-router-dom";
import { userDataSlice } from "../Store/userDataSlice";
import { useDispatch } from "react-redux";
import { SERVER_URL } from "../GlobalCommonData";
import { Container, Row, Col, Button } from "react-bootstrap";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function Login() {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userPassword, setPassword] = useState("");
  const [spinnerFlag, setSpinnerFlag] = useState(false);
  let [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();
  const handleSignUp = () => {
    console.log("here");
    history.push("/signUp");
  };
  const handleLogin = () => {
    setSpinnerFlag(true);
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
          setSpinnerFlag(false);
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
          setSpinnerFlag(false);
          setErrorMsg(res.errorMsg);
          console.log(res.errorMsg);
        }
      });
  };
  const handleForgotPW = async () => {
    history.push("/forgotPassword")
  }
  return (
    <div className="base-container">
      <video src={videoSrc} autoPlay loop muted />
      <Container fluid>
        <Row>
          <Col>
            <br />
            <div className="loginBox">
              <p className="heading-tag">ConnectIN</p>
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
                      disabled={spinnerFlag}
                    ></input>
                  </div>
                  <p className="errorMsg">{errorMsg}</p>
                </div>
              </div>
              <Container fluid>
                <Row>
                  <Col>
                    <Button
                      type="button"
                      className="btn-left"
                      variant="light"
                      onClick={handleLogin}
                      disabled={spinnerFlag}
                    >
                      Login
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="button"
                      variant="light"
                      onClick={handleSignUp}
                      disabled={spinnerFlag}
                    >
                      Sign Up
                    </Button>
                  </Col>
                </Row>
              </Container>
              {spinnerFlag && (
                <div>
                  <br />
                  <div style={{ textAlign: "center" }}>
                    <Loader type="Oval" color="grey" height={50} width={50} />
                  </div>
                  <p style={{ color: "white", textAlign: "center" }}>
                    Logging IN
                  </p>
                </div>
              )}
              <div style={{ textAlign: "center" }}>
                <br />
                <Button
                  type="button"
                  variant="light"
                  onClick={handleForgotPW}
                  disabled={spinnerFlag}
                >
                  Forgot Password?
                </Button>
              </div>
              <br />
            </div>
          </Col>
          <Col className="quote-class">
            <RandomQuotes />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
