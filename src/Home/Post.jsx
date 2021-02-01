import React, { useState, useEffect } from "react";
import "./post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-bootstrap";
import imgSrc from "../Login/images/img-1.jpg";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";
import Textarea from "react-expanding-textarea";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import CommentModal from "./CommentModal";

toast.configure();

function Post(props) {
  const history = useHistory();
  const [commentList, setCommentList] = useState(props.post.comments);
  const userData = useSelector((globalStore) => globalStore.users);
  const [alreadyLiked, setAlreadyLiked] = useState(props.alreadyLiked);
  const [commentTileFlag, setCommentTileFlag] = useState(true);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [postButtonFlag, setpostButtonFlag] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [imgSource, setSource] = useState(null);
  const [loader, setLoader] = useState(false);

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  useEffect(() => {
    const curImage = props.imagesRelatedToPost[0];
    if (props.imagesRelatedToPost.length > 0) {
      const base64Flag = "data:image/jpeg;base64,";
      const imageStr = arrayBufferToBase64(curImage.img.data.data);
      setSource(base64Flag + imageStr);
    }
  }, [props.imagesRelatedToPost]);

  const handleLikeClick = () => {
    setAlreadyLiked(!alreadyLiked);
    fetch("http://localhost:9999/markLikedOrUnliked", {
      method: "POST",
      body: JSON.stringify({
        userId: userData.userId,
        postId: props.post._id,
      }),
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.authorizationSuccess) {
          if (res.success) {
          } else {
            toast.error("Server Error, check your Internet connection!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 5 * 1000,
            });
            setAlreadyLiked(false);
          }
        } else {
          toast.error("Session Expired, Please Login", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5 * 1000,
          });
          setTimeout(() => {
            history.push("/");
          }, 4 * 1000);
        }
      });
  };

  const handleCommentClick = () => {
    setCommentModalVisible(!commentModalVisible);
  };

  const handlePostComment = () => {
    setLoader(true);
    fetch("http://localhost:9999/postComment", {
      method: "POST",
      body: JSON.stringify({
        userId: userData.userId,
        postId: props.post._id,
        commentText: commentText,
        userName: userData.userName,
      }),
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.authorizationSuccess) {
          if (res.success) {
            setLoader(false);
            setCommentText("");
            setpostButtonFlag(false);
            const newComment = {
              postedBy: userData.userName,
              commentText: commentText,
            };
            setCommentList([newComment, ...commentList]);
          } else {
            toast.error(
              "Server Error! Couldnt post the comment, check your Internet connection!",
              {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5 * 1000,
              }
            );
          }
        } else {
          toast.error("Session Expired, Please Login", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5 * 1000,
          });
          setTimeout(() => {
            history.push("/");
          }, 4 * 1000);
        }
      });
  };
  return (
    <div className="post-container">
      <Container>
        <Row>
          <Col md="2" lg="2" sm="2" xs="2">
            <div className="user-profile-picture">
              {/*User Image Display as of now dummy display*/}
            </div>
          </Col>
          <Col md="7" lg="8" sm="6" xs="6">
            <div className="follow-user-div">
              <p className="post-user">{props.post.userName}</p>
            </div>
          </Col>
          <Col md="3" lg="2" sm="4" xs="4">
            <Button color="link" className="btn-follow">
              +Trail
            </Button>
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
              <div
                className={
                  alreadyLiked === true
                    ? "icon-grp-post-liked"
                    : "icon-grp-post"
                }
                onClick={handleLikeClick}
              >
                <FontAwesomeIcon className="" icon={faThumbsUp} />
                {alreadyLiked === true
                  ? `${
                      props.post.likeCount > 1
                        ? `  You and ${props.post.likeCount - 1} others`
                        : ""
                    }`
                  : `    ${
                      props.post.likeCount > 0 ? props.post.likeCount : " "
                    }`}
              </div>
            </Col>
            <Col md="4" lg="4" sm="4" xs="4">
              <div className="icon-grp-post" onClick={handleCommentClick}>
                <FontAwesomeIcon className="" icon={faComments} />
              </div>
            </Col>
            <Col md="4" lg="4" sm="4" xs="4">
              <div className="icon-grp-post">
                <FontAwesomeIcon className="" icon={faSave} />
              </div>
            </Col>
          </Row>
          {commentTileFlag && (
            <>
              <Row>
                <Col md="2" lg="2" sm="3" xs="3">
                  <div className="user-profile-picture-comment">
                    <img
                      className="comment-user-img"
                      src="https://as2.ftcdn.net/jpg/01/26/63/11/500_F_126631173_W9Nq8ZA5s0R0M3ZIBx3BMytVIFseGa9c.jpg"
                      alt=""
                    ></img>
                  </div>
                </Col>
                <Col>
                  <br />
                  <div>
                    <Textarea
                      className="comment-box"
                      maxLength="3000"
                      name="Comment"
                      rows={2}
                      placeholder="What do you feel about this..!"
                      value={commentText}
                      onChange={(evt) => {
                        const commentText = evt.target.value;
                        if (commentText.trim().length > 0) {
                          //console.log("here..");
                          setpostButtonFlag(true);
                        } else {
                          setpostButtonFlag(false);
                        }
                        setCommentText(evt.target.value);
                      }}
                    />
                    <br />
                  </div>
                </Col>
              </Row>
              {postButtonFlag && (
                <Row>
                  <Col md="2" lg="2" sm="3" xs="3"></Col>
                  <Col md="2" lg="2" sm="3" xs="3">
                    <div className="post-btn-grp">
                      <Button
                        className="post-btn"
                        color="primary"
                        onClick={handlePostComment}
                      >
                        Post
                      </Button>
                      {loader && (
                        <Loader
                          type="ThreeDots"
                          color="black"
                          height={40}
                          width={40}
                        />
                      )}
                    </div>
                  </Col>
                </Row>
              )}
            </>
          )}
          {commentModalVisible && (
            <Row>
              <Col>
                <CommentModal commentList={commentList} />
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </div>
  );
}

export default Post;
