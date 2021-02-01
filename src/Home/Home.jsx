import React, { Component } from "react";
import "./Home.css";
import HomeBar from "./HomeBar";
import ProfileCard from "./ProfileCard";
import MiddleContainer from "./MiddleContainer";
import NewsFeed from "./NewsFeed";
import News from "./News";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

function Home() {
  return (
    <>
      <Container fluid>
        <Row className="no-gutters">
          <Col md="2" lg="2" sm="2" xs="2">
            <HomeBar />
          </Col>
          <Col md="6" lg="6" sm="10" xs="10">
            <MiddleContainer />
          </Col>
          <Col md="4" lg="4" sm="0" xs="0">
            <div className="news">
              <News />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
