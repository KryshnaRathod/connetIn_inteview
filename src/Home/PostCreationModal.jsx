import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileUpload from "./FileUpload";
import { Input } from "reactstrap";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import "./PostCreationModal.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { postDataSlice } from "../Store/postDataSlice";
import { userDataSlice } from "../Store/userDataSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { SERVER_URL } from "../GlobalCommonData";
toast.configure();

function PostCreationModal(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [postText, setPostText] = useState("");
  const [loader, setLoader] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [tagText, setTag] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);
  const userData = useSelector((globalStore) => globalStore.users);
  //console.log(postList);

  const handlePost = () => {
    const postTextBuff = postText.trim();
    console.log(tagList);
    if (postTextBuff.length > 0) {
      const formData = new FormData();
      if (selectedImg !== null) {
        formData.append("file", selectedImg);
      }
      formData.append("userId", userData.userId);
      formData.append("userName", userData.userName);
      formData.append("postText", postText);
      formData.append("tagList", tagList);
      //console.log(formData.get("test"));
      const headers = {
        authToken: localStorage.getItem("authToken"),
      };
      fetch(`${SERVER_URL}savePost`, {
        method: "POST",
        headers: headers,
        body: formData,
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          setLoader(false);
          if (res.authorizationSuccess) {
            if (res.successful) {
              setPostText("");
              setTagList([]);
              setTag("");
              setSelectedImg(null);
              console.log("Posted..");
              const payload = {
                post: res,
              };
              dispatch(postDataSlice.actions.addNewPost(payload));
              const updatedUserPayload = { ...userData };
              updatedUserPayload.posts = [
                ...updatedUserPayload.posts,
                res.post._id,
              ];
              dispatch(
                userDataSlice.actions.updateUserData(updatedUserPayload)
              );
              props.onHide();
            } else {
              toast.error("Server Problem, check your Internet Connection", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5 * 1000,
              });
              console.log("Not Posted..");
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
    }
  };

  useEffect(() => {
    if (selectedImg != null) {
      console.log("sucess!");
    }
  }, [selectedImg]);

  const handleKeyDown = (evt) => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();
      if (evt.target.value.trim() && userData.skills.length < 4) {
        setTag("");
        const buffTagList = [...tagList, evt.target.value];
        setTagList(buffTagList);
      } else {
        //setSkillOverflowFlag(true);
      }
    }
  };

  const handleDelete = (item) => {
    const newtagList = tagList.filter((i) => i !== item);
    setTagList(newtagList);
  };

  const displayFlexCSS = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Knowledge is Wisdom
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col md="2" lg="2" sm="2" xs="2">
              <div className="user-profile-picture-modal">
                {/*User Image Display as of now dummy display*/}
              </div>
            </Col>
            <Col md="10" lg="10" sm="10" xs="10">
              <p className="post-creation-userName">{userData.userName}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              {loader === false ? (
                <div>
                  <Input
                    type="textarea"
                    placeholder="Share your Thoughts"
                    rows={5}
                    value={postText}
                    onChange={(evt) => setPostText(evt.target.value)}
                  />
                  <br />
                  <div style={displayFlexCSS}>
                    {tagList.map((item) => (
                      <div className="tag-item" key={item + Math.random(1)}>
                        {item}
                        <button
                          type="button"
                          className="button"
                          onClick={() => handleDelete(item)}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>

                  <Input
                    type="textarea"
                    name="Domain Tags"
                    placeholder="Add relevant tags for better user experience"
                    onChange={(evt) => {
                      setTag(evt.target.value);
                      //reset();
                    }}
                    rows={2}
                    value={tagText}
                    onKeyDown={handleKeyDown}
                  />
                  <div>
                    <FileUpload setSelectedImg={setSelectedImg} />
                  </div>
                </div>
              ) : (
                <div className="loader-post-creation">
                  <Loader
                    type="Grid"
                    color="grey"
                    height={100}
                    width={100}
                    //timeout={3000} //3 secs
                  />
                  Posting..
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handlePost} disabled={!postText.trim().length}>
          Post
        </Button>
        <Button
          onClick={() => {
            props.onHide();
            setPostText("");
            setTagList([]);
            setTag("");
            setSelectedImg(null);
          }}
          disabled={loader}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PostCreationModal;
