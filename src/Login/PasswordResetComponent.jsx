import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import RandomQuotes from "./RandomQuotes";
import { Container, Row, Col, Button } from "react-bootstrap";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import videoSrc from "./videos/video-2-main.mp4";
import { SERVER_URL } from "../GlobalCommonData";

function PasswordResetComponent() {
  const params = useParams();
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [spinnerFlag, setSpinnerFlag] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (confirmPW.trim().length && confirmPW !== password) {
      setErrMsg("Passwords dont Match!");
    } else {
      setErrMsg("");
    }
  }, [confirmPW]);

  const resetServerCall = () => {
    const url = `${SERVER_URL}resetPW`;
    const restApiBody = {
      method: "POST",
      body: JSON.stringify({
        userName: userName,
        password: password,
        token: params.validToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    fetch(url, restApiBody)
      .then((res) => res.json())
      .then((res) => {
        setSpinnerFlag(false);
        if(res.success) {
          if(res.userFound) {
            if(res.tokenValid) {
              if(res.dbConnectSuccess) {
                setErrMsg('');
                setSuccessMsg("Password Updated! Try logging IN using the new Password!")
                setTimeout(() => {
                  history.push("/");
                }, 2 * 1000);
              }
              else {
                setErrMsg("Nothing is perfect on the human stage. So are we, Database connection Error, Please try again after sometime!");
              }
            }
            else {
              setErrMsg("Token expired or invalid, please click on Forgot Password and restart the process"); 
            }
          }
          else {
            setErrMsg("Hey! We are meeting for the first time, Please check Username or Signup");  
          }
        }
        else {
          setErrMsg("Nothing is perfect on the human stage. So are we, Technical Error, Please try again after sometime!");
        }
      });
  };

  const handleReset = () => {
    if (userName.trim().length === 0) {
      setErrMsg("UserName is required!");
    } else if (password.trim().length === 0) {
      setErrMsg("Password is required!");
    } else if (confirmPW.trim().length === 0) {
      setErrMsg("Please confirm the password!");
    }
    setSpinnerFlag(true);
    resetServerCall();
  };

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
                    <label className="labelClass">UserName</label>
                    <input
                      type="text"
                      required="true"
                      placeholder="User Name"
                      onChange={(evt) => {
                        setUserName(evt.target.value);
                      }}
                      disabled={spinnerFlag}
                    ></input>
                  </div>
                </div>
                <div className="form">
                  <div className="form-group">
                    <label className="labelClass">Password</label>
                    <input
                      type="password"
                      required="true"
                      placeholder="Password"
                      onChange={(evt) => {
                        setPassword(evt.target.value);
                      }}
                      disabled={spinnerFlag}
                    ></input>
                  </div>
                </div>
                <div className="form">
                  <div className="form-group">
                    <label className="labelClass">Confirm Password</label>
                    <input
                      type="password"
                      required="true"
                      placeholder="Confirm Password"
                      onChange={(evt) => {
                        setConfirmPW(evt.target.value);
                      }}
                      disabled={spinnerFlag}
                    ></input>
                  </div>
                  <p style={{ color: "red" }}>{errMsg}</p>
                  <p style={{ color: "green" }}>{successMsg}</p>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <Button
                  type="button"
                  variant="light"
                  disabled={spinnerFlag}
                  onClick={handleReset}
                >
                  Reset Password
                </Button>
              </div>
              <br />
              {spinnerFlag && (
                <div>
                  <br />
                  <div style={{ textAlign: "center" }}>
                    <Loader type="Oval" color="grey" height={50} width={50} />
                  </div>
                  <p style={{ color: "white", textAlign: "center" }}>
                    Please wait! While we update our System with your new
                    Password.
                  </p>
                </div>
              )}
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

export default PasswordResetComponent;
