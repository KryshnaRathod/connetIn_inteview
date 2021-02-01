import React from "react";
import "./News.css";

function NewsItem(props) {
  return (
    <div>
      {
        <div className="news-item-box">
          <label className="news-item">Title</label>
          <p>{props.curNews.title}</p>
          <label className="news-item">Headline</label>
          <p>{props.curNews.description}</p>
          <label className="news-item">Source</label>
            <a className="url-cls" href={props.curNews.url} target="_blank">
              {props.curNews.url}
            </a>
        </div>
      }
    </div>
  );
}

export default NewsItem;
