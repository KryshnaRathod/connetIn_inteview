import React, { useEffect, useState } from "react";
import "./login.css";
const { quotes } = require("./Quotes");

function RandomQuotes() {
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
  return (
    <div>
      <blockquote className="blockquote">
        <p>{quote}</p>
      </blockquote>
      <br />
    </div>
  );
}

export default RandomQuotes;
