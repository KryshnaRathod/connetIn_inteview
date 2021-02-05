import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./CommentModal.css";

function CommentModal(props) {
  return (
    <div>
      {props.commentList.length > 0 ? (
        props.commentList.map((comment, index) => {
          return (
            <div>
              <Container>
                <Row>
                  <Col md="2" lg="2" sm="3" xs="3">
                    <div className="user-profile-picture-comment">
                      <span className="tooltiptext">{comment.postedBy}</span>
                      <img
                        className="comment-user-img"
                        src="https://as2.ftcdn.net/jpg/01/26/63/11/500_F_126631173_W9Nq8ZA5s0R0M3ZIBx3BMytVIFseGa9c.jpg"
                        alt=""
                      ></img>
                    </div>
                    {/* <p className="comment-userName">{comment.postedBy}</p> */}
                  </Col>
                  <Col>
                    <div className="comment-modal-div">
                      <p>{comment.commentText}</p>
                    </div>
                  </Col>
                </Row>
              </Container>
              <br />
            </div>
          );
        })
      ) : (
        <p>No Comments Posted..</p>
      )}
    </div>
  );
}

export default CommentModal;
