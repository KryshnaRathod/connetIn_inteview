import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ScreenTemplate.css";
import { useDebouncedCallback } from "use-debounce";
import SearchbarModal from "./Home/SearchbarModal";

function ScreenTemplate(props) {
  const [smallScr, setSmallScreen] = useState(false);
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
    props.setModalShow(true);
  };

  const debounced = useDebouncedCallback(
    // function to get the records related to query term.
    (value) => {
      if (value) {
        props.setModalShow(true);
        const url = `http://localhost:9999/getSearchResults?searchVal=${value}`;
        fetch(url, { credentials: "include" })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            setFilteredList(res);
          });
      } else {
        props.setModalShow(true);
      }
      console.log(value);
    },
    // delay in ms
    1000
  );

  const onFocusOut = () => {
    props.setModalShow(false);
  };

  useEffect(() => {
    sizeArticulation();
  }, []);

  window.addEventListener("resize", sizeArticulation);
  return (
    <div className="middle-container-template">
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
              {!smallScr && <FontAwesomeIcon className="" icon={faSearch} />}
            </Col>
          </Row>
        </Container>
        <br />
        <div
          className={
            props.modalShow === true
              ? "search-bar-div-visible"
              : "search-bar-div-hidden"
          }
        >
          <SearchbarModal
            show={props.modalShow}
            onHide={() => props.setModalShow(false)}
            filteredList={filteredList}
          />
        </div>
        <br />
      </div>
      <br />
    </div>
  );
}

export default ScreenTemplate;
