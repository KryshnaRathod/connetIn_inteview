import React, { useState, useEffect } from "react";
import "./Home.css";
import ImgSrc from "../Login/images/img-2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Label, Form, FormGroup, Button, Input } from "reactstrap";
import { useHistory } from "react-router-dom";
import { SERVER_URL } from "../GlobalCommonData";

function HomeBar() {
  const userInfo = useSelector((globalStore) => globalStore.users);
  const [smallScr, setSmallScreen] = useState(false);
  const history = useHistory();
  const handleHomeBarClick = (selectedOption) => {
    history.push(`/${selectedOption}/${userInfo.userId}`);
  };
  const handleLogOut = () => {
    fetch(`${SERVER_URL}logOut`, { credentials: "include" })
      .then((r) => r.json())
      .then((r) => {
        console.log("logged out..");
      });
    history.push("/");
  };
  const sizeArticulation = () => {
    if (window.innerWidth <= 780) {
      //console.log(window.innerWidth);
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  };

  useEffect(() => {
    sizeArticulation();
  }, []);

  window.addEventListener("resize", sizeArticulation);

  return (
    <div className="home-bar-container">
      <div className="icon">
        <h2 className="heading">Connect IN</h2>
        <div className="icon-item">
          {/* <img className="imgCls"  src={ImgSrc} alt=""></img> */}
          <h2 className="imgCls">CIN</h2>
        </div>
      </div>
      <div className="icon">
        <div className="icon-item" onClick={() => handleHomeBarClick("home")}>
          <FontAwesomeIcon className="" color="white" icon={faHome} />
          {!smallScr && <p className="placeholder">Home</p>}
        </div>
        <div
          className="icon-item"
          onClick={() => handleHomeBarClick("network")}
        >
          <FontAwesomeIcon className="" color="white" icon={faUsers} />
          {!smallScr && <p className="placeholder">My Network</p>}
        </div>
        <div className="icon-item" onClick={() => handleHomeBarClick("posts")}>
          <FontAwesomeIcon className="" color="white" icon={faStickyNote} />
          {!smallScr && <p className="placeholder">Posts</p>}
        </div>
        <div
          className="icon-item"
          onClick={() => handleHomeBarClick("notifications")}
        >
          <FontAwesomeIcon className="" color="white" icon={faBell} />
          {!smallScr && <p className="placeholder">Notifications</p>}
        </div>
        <div
          className="icon-item"
          onClick={() => handleHomeBarClick("profile")}
        >
          <FontAwesomeIcon className="" color="white" icon={faUserSecret} />
          {!smallScr && <p className="placeholder">Profile</p>}
        </div>
        <div className="icon-item" onClick={() => handleLogOut("logout")}>
          <FontAwesomeIcon className="" color="white" icon={faSignOutAlt} />
          {!smallScr && <p className="placeholder">Log Out</p>}
        </div>
        <div className="profile-photo-div-homebar">
          <img
            className="comment-user-img"
            src="https://as2.ftcdn.net/jpg/01/26/63/11/500_F_126631173_W9Nq8ZA5s0R0M3ZIBx3BMytVIFseGa9c.jpg"
            alt=""
          ></img>
          <p className="username-div">{userInfo.userName}</p>
        </div>
      </div>
    </div>
  );
}

export default HomeBar;
