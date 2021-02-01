import "./App.css";
import Login from "./Login/Login";
import Home from "./Home/Home";
import SignUp from "./Login/SignUp";
import UserProfilePage from "./UserProfile/UserProfilePage";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MainPostPage from "./PostsDisplay/MainPostPage";
import { useDispatch } from "react-redux";
import { userDataSlice } from "./Store/userDataSlice";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const getUserDataIfLoggedIn = () => {
    const url = `http://localhost:9999/getUserData`;
    fetch(url, { credentials: "include" })
      .then((res) => res.json())
      .then((res) => {
        if(res.retrivalSuccess) {
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
        }
        else {
          history.push("/");
        }
      });
  };
  useEffect(() => {
    getUserDataIfLoggedIn();
  }, []);
  return (
    <div className="main-div">
      <Switch>
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
