import "./App.css";
import Login from "./Login/Login";
import Home from "./Home/Home";
import SignUp from "./Login/SignUp";
import UserProfilePage from "./UserProfile/UserProfilePage";
import { useParams } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import MainPostPage from "./PostsDisplay/MainPostPage";
import { useDispatch } from "react-redux";
import { userDataSlice } from "./Store/userDataSlice";
import { SERVER_URL } from "./GlobalCommonData";
import PasswordResetComponent from "./Login/PasswordResetComponent";
import ForgotPassword from "./Login/ForgotPassword";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const urlFromMail = history.location.pathname;
  const getUserDataIfLoggedIn = () => {
    const url = `${SERVER_URL}getUserData`;
    fetch(url, { credentials: "include" })
      .then((res) => res.json())
      .then((res) => {
        if (res.retrivalSuccess) {
          const payload = {
            userId: res.userData._id,
            userName: res.userData.userName,
            userEmail: res.userData.userEmail,
            gitHubLink: res.userData.gitHubLink,
            linkedInLink: res.userData.linkedInLink,
            postsLiked: res.userData.postsLiked,
            company: res.userData.company,
            designation: res.userData.designation,
            skills: res.userData.skills,
            followers: res.userData.followers,
            following: res.userData.following,
            posts: res.userData.posts,
          };
          dispatch(userDataSlice.actions.addUserData(payload));
          history.push("/home/" + res.userData._id);
        } else {
          history.push("/");
        }
      });
  };
  useEffect(() => {
    if (urlFromMail.indexOf("/reset/") === -1) {
      getUserDataIfLoggedIn();
    }
  }, []);
  return (
    <div className="main-div">
      <Switch>
        <Route path="/forgotPassword">
          <ForgotPassword />
        </Route>
        <Route path="/reset/:validToken">
          <PasswordResetComponent />
        </Route>
        <Route path="/profile/:userId">
          <UserProfilePage />
        </Route>
        <Route path="/posts/:userId">
          <MainPostPage />
        </Route>
        <Route path="/home/:userId">
          <Home />
        </Route>
        <Route path="/signUp">
          <SignUp />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
