import React, { useEffect, useState, useRef } from "react";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FileUpload.css";

toast.configure();

function FileUpload(props) {
  const fileInput = useRef(null);
  const [imgTooBig, setBigImgFlag] = useState(false);


  const handleFileChange = (event) => {
    const curImg = event.target.files[0];
    console.log(curImg);
    if (curImg !== undefined && curImg.size > 1048576) {
      //Size should be less than 1 MB.
      toast.error("Image should be less than 1MB", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5 * 1000,
      });
      setBigImgFlag(true);
    }else if(curImg !== undefined && curImg.type !== "image/png" && curImg.type !== "image/jpeg" && curImg.type !== "image/jpg"){
      toast.error("Only Images allowed!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5 * 1000,
      });
    } 
    else {
      setBigImgFlag(false);
      props.setSelectedImg(event.target.files[0]);
      toast.info("Image Uploaded!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5 * 1000,
      });
    }
  };

  const handleFileSelect = (evt) => {
    evt.preventDefault();
    setBigImgFlag(false);
    fileInput.current.click();
  };
  return (
    <Container>
      <Row>
        <Col sm="4" md="4" lg="4" xs="10">
          <Container>
            <Row>
              <Col sm="4" md="2" lg="2" xs="6">
                <input
                  type="file"
                  className="img-hidden"
                  onChange={(e) => handleFileChange(e)}
                  ref={fileInput}
                  name="file"
                ></input>
                <div className="fileUpload-image" onClick={handleFileSelect}>
                  <FontAwesomeIcon icon={faImage} />
                </div>
              </Col>
              <Col sm="4" md="2" lg="2" xs="6">
                <div className="fileUpload-image">
                  <FontAwesomeIcon icon={faVideo} />
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
        {imgTooBig && (
          <p className="file-size-error">Image Size should be less than 1MB!</p>
        )}
      </Row>
    </Container>
  );
}

export default FileUpload;
