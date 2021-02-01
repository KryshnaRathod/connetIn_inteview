import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import './PostsDisplay.css';

function UserPost(props) {
  const [imgSource, setSource] = useState(null);
  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  useEffect(() => {
    const curImage = props.imagesRelatedToPost[0];
    console.log(curImage);
    if (props.imagesRelatedToPost.length > 0) {
      const base64Flag = "data:image/jpeg;base64,";
      const imageStr = arrayBufferToBase64(curImage.img.data.data);
      setSource(base64Flag + imageStr);
    }
  }, [props.imagesRelatedToPost]);
  return (
    <div className="post-container">
      <Container>
        <Row>
          <Col md="2" lg="2" sm="2" xs="2">
            <div className="user-profile-picture">
              {/*User Image Display as of now dummy display*/}
            </div>
          </Col>
          <Col md="10" lg="10" sm="10" xs="10">
            <p className="post-user">{props.post.userName}</p>
          </Col>
        </Row>
      </Container>

      <p className="text-post">{props.post.postText}</p>
      <div className="post-img-div">
        {imgSource !== null && (
          <img className="post-img" src={imgSource} alt=""></img>
        )}
      </div>
      <div className="post-icon-group">
        <Container>
          <Row>
            <Col md="4" lg="4" sm="4" xs="4">
              <div>
                <FontAwesomeIcon className="" icon={faThumbsUp} />
                {` ${props.post.likeCount}`}
              </div>
            </Col>
            <Col md="4" lg="4" sm="4" xs="4">
              <div >
                <FontAwesomeIcon className="" icon={faComments} />
                {` ${props.post.comments.length}`}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default UserPost;
