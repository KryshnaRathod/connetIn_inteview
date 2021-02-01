import React, { useState } from "react";
import { Button } from "reactstrap";
import "./SearchBarModal.css";

function SearchbarModal(props) {
  return (
    <div className="search-bar-modal">
      {props.filteredList.map((record, index) => {
        return (
          <div key={index} className="search-bar-result-div">
            <p >{record.userName}</p>
          </div>
        );
      })}
      <Button
        color="link"
        className="close-btn-searchBar"
        onClick={props.onHide}
      >
        Close
      </Button>
    </div>
  );
}

export default SearchbarModal;
