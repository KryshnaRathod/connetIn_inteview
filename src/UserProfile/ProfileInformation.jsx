import React from "react";
import "./UserProfile.css";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

function ProfileInformation() {
  const userData = useSelector((globalStore) => globalStore.users);
  return (
    <div className="post-container-profile">
      <Container>
        <Row>
          <Col>
            <div className="user-profile-picture-profile">
              {/*User Image Display as of now dummy display*/}
              <img
                src="https://as2.ftcdn.net/jpg/01/26/63/11/500_F_126631173_W9Nq8ZA5s0R0M3ZIBx3BMytVIFseGa9c.jpg"
                alt=""
                className="profile-picture-profile"
              ></img>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <br />
            <div className="user-profile-info">
              <p>{`Username: ${userData.userName}`}</p>
              <p>{`Email: ${userData.userEmail}`}</p>
              <p>{`Posts Uploaded: ${userData.posts.length}`}</p>
              <p>{`Posts Liked: ${userData.postsLiked.length}`}</p>
              <p>{`Company: ${userData.company}`}</p>
              <p>{`Designation: ${userData.designation}`}</p>
              <p>{`Followers: ${userData.followers.length}`}</p>
              <p>{`Following: ${userData.following.length}`}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfileInformation;
