import React, { useEffect, useState } from "react";
import "./login.css";
const { quotes } = require("./Quotes");

function RandomQuotes(props) {
  const [quote, setQuote] = useState(
    "Programming isn't about what you know; it's about what you can figure out."
  );
  
  useEffect(() => {
    const intervalId  = setInterval(() => {
      const tempIndex = Math.floor(Math.random() * quotes.length);
      const tempQuote = quotes[tempIndex].name;
      setQuote(tempQuote);
    }, 10 * 1000);
    return () => clearInterval(intervalId);
  });
  const textStyle = {
    fontSize: `${props.fontSize !== undefined ? props.fontSize : ""}`,
    borderTop: "3px solid #bf0024",
    fontFamily: "FontAwesome",
  };
  return (
    <div>
      <blockquote className={props.fontSize !== undefined ? "":"blockquote"}>
        <p style={textStyle}>{quote}</p>
      </blockquote>
      <br />
    </div>
  );
}

export default RandomQuotes;
