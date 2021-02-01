import React from "react";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

function ProfileCard() {
  const isNullOrUndefined = (val) => {
    return val === null || val === undefined || val === "";
  };
  const userInfo = useSelector((globalStore) => globalStore.users);
  return (
    <div className="profileContainer">
      <div className="userPic">
        <FontAwesomeIcon className="profileLogo" icon={faUserSecret} />
      </div>
      <div className="userInfo">
        <p className="userInfoPTag">
          <b>{userInfo.userName}</b>
          <br />
          {
            isNullOrUndefined(userInfo.designation) && isNullOrUndefined(userInfo.company)? "Yet to start working.." : `${userInfo.designation} at ${userInfo.company}`
          }
        </p>
        <p className="userInfoPTag">Profile Views - 101</p>
        <p className="userInfoPTag">Posts Views - 200</p>
        <p className="userInfoPTag">Best Posts-</p>
      </div>
    </div>
  );
}

export default ProfileCard;
