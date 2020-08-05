import React from "react";
import "../static/Cell.css";

export default function (props) {
  return (
    <div className="cell">
      <img src={props.post.imgUrl} alt="nothing" />
      <a href="https://www.google.com/">
        <h5 className="plain-text">{props.post.title}</h5>
      </a>
    </div>
  );
}
