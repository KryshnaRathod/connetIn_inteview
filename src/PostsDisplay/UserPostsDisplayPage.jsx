import React, { useState, useEffect } from "react";
import "../Home/MiddleContainer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col } from "react-bootstrap";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import UploadPostWidget from "../Home/UploadPostWidget";
import UserPostDisplay from './UserPostDisplay'
import SearchbarModal from "../Home/SearchbarModal";
import { useDebouncedCallback } from "use-debounce";

function UserPostsDisplayPage() {
  const [smallScr, setSmallScreen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const sizeArticulation = () => {
    if (window.innerWidth <= 300) {
      console.log(window.innerWidth);
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  };

  const handleOnFocus = () => {
    setModalShow(true);
  };

  useEffect(() => {
    sizeArticulation();
  }, []);

  window.addEventListener("resize", sizeArticulation);

  const debounced = useDebouncedCallback(
    // function to get the records related to query term.
    (value) => {
      if (value) {
        setModalShow(true);
        const url = `http://localhost:9999/getSearchResults?searchVal=${value}`;
        fetch(url, { credentials: "include" })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            setFilteredList(res);
          });
      } else {
        setModalShow(false);
      }
      console.log(value);
    },
    // delay in ms
    1000
  );

  const onFocusOut = () => {
    setModalShow(false);
  };

  return (
    <div className="middle-container">
      <br />
      <div className="fixed-container">
        <Container>
          <Row>
            <Col md="10" lg="11" sm="10" xs="10">
              <div className="searchBarDiv">
                <input
                  className="searchBar"
                  placeholder="Whats in your Curious Mind!"
                  onFocus={handleOnFocus}
                  onBlur={onFocusOut}
                  onChange={(e) => debounced.callback(e.target.value)}
                ></input>
              </div>
            </Col>
            <Col md="2" lg="1" sm="2" xs="2">
              {!smallScr && (
                <FontAwesomeIcon className="" color="white" icon={faSearch} />
              )}
            </Col>
          </Row>
        </Container>
        <br />
        <div
          className={
            modalShow === true
              ? "search-bar-div-visible"
              : "search-bar-div-hidden"
          }
        >
          <SearchbarModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            filteredList={filteredList}
          />
        </div>
        <div
          className={
            modalShow === true ? "uploadPostWidget-blur" : ""
          }
        >
          <UploadPostWidget />
        </div>
      </div>
      <br />
      <div
        className={modalShow === true ? "news-feed-cls-blur" : "news-feed-cls"}
      >
        <UserPostDisplay />
      </div>
    </div>
  );
}

export default UserPostsDisplayPage;
