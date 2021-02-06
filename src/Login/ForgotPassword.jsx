import React, { useState } from "react";
import RandomQuotes from "./RandomQuotes";
import videoSrc from "./videos/video-2-main.mp4";
import { useHistory } from "react-router-dom";
import { SERVER_URL } from "../GlobalCommonData";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function ForgotPassword() {
  const [userEmail, setEmail] = useState("");
  const [errMsg, setErrorMsg] = useState("");
  const [spinnerFlag, setSpinnerFlag] = useState(false);
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  const handleSendEmail = () => {
    if (userEmail.trim().length) {
      if (validateEmail(userEmail)) {
        setSpinnerFlag(true);
        axios
          .post(`${SERVER_URL}forgotPassword`, {
            userEmail: userEmail,
          })
          .then(res => JSON.parse(res.request.responseText))
          .then((res) => {
            setSpinnerFlag(false);
            if (res.success) {
              if (res.userPresent) {
                  
              } else {
                setErrorMsg(
                  "User Email not registered with us, Either check the email or Sign Up!"
                );
              }
            } else {
              setErrorMsg(
                "Server Error, Please visit us sometime later, we are under maintainance"
              );
            }
          });
      } else {
        setErrorMsg(
          "Invalid Email! Our system thinks that email is invalid with the accuracy of 99.99 + 0.01 %"
        );
      }
    } else {
      setErrorMsg("Email is necessary for this process!");
    }
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
                    <label className="labelClass">User Email</label>
                    <input
                      type="email"
                      required="true"
                      placeholder="User Email"
                      onChange={(evt) => {
                        setErrorMsg("");
                        setEmail(evt.target.value);
                        setErrorMsg("");
                      }}
                    ></input>
                    <p className="errorMsg">{errMsg}</p>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <Button
                  type="button"
                  variant="light"
                  onClick={handleSendEmail}
                  disabled={spinnerFlag}
                >
                  Send Email
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
                    Sending Email for Password reset!
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

export default ForgotPassword;
