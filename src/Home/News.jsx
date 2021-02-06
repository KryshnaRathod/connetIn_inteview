import React, { useEffect, useState } from "react";
import "./News.css";
import NewsItem from "./NewsItem";
import { Container, Row, Col } from "react-bootstrap";
import { API_KEY } from "./newsAPICreds.js";
import { useSelector } from "react-redux";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
const { Facts } = require("./Facts");

function News() {
  const [newsList, setNewsList] = useState([]);
  const [curNews, setNews] = useState({});
  const [loader, setLoader] = useState(true);
  const userData = useSelector((store) => store.users);
  //console.log(userData.skills[0]);
  const getNews = () => {
    let newsApiUrl = `https://newsapi.org/v2/everything?`;
    if (userData.length > 0  && userData.skills.length > 0) {
      userData.skills.forEach(skill => {
        newsApiUrl += `q=${skill}&`
      });
    }
    else {
      newsApiUrl += `q=general&`
    }
    newsApiUrl += `from=2021-01-12&to=2021-01-12&sortBy=popularity&apiKey=${API_KEY}`
    fetch(newsApiUrl)
      .then((res) => res.json())
      .then((res) => {
        //setLoader(false);
        if (res.status === "ok") {
          console.log(res.articles);
          setNewsList(res.articles);
          //setNews(res.articles[1]);
        } else {
          console.log("failed..");
        }
      });
  };
  useEffect(() => {
    getNews();
  }, []);
  useEffect(() => {
    let intervalId = null;
    if (newsList.length > 0) {
      setLoader(false);
      setNews(newsList[0]);
      intervalId = setInterval(() => {
        setNews(newsList[Math.floor(Math.random() * newsList.length)]);
      }, 5000);
    }
    return () => clearInterval(intervalId);
  }, [newsList]);
  return (
    <div className="news-container">
      <Container>
        <Row>
          <Col>
            <div className="news-incoming">
              <div className="heading-div">
                <p className="heading-news">News!</p>
              </div>
              {loader === true ? (
                <div className="loader">
                  <Loader
                    type="Bars"
                    color="red"
                    height={100}
                    width={100}
                    //timeout={3000} //3 secs
                  />
                  <div className="quote-cls">{Facts[0]}</div>;
                  <div className="quote-cls">{Facts[1]}</div>;
                </div>
              ) : (
                <NewsItem curNews={curNews} />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default News;
