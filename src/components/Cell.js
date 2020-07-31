import React, { Component } from "react";
import "../static/Cell.css";

export default class Cell extends Component {
  render() {
    return (
      <div className="cell">
        <img src={this.props.post.imgUrl} alt="nothing" />
        <a href="#">
          <h5 className="plain-text">{this.props.post.title}</h5>
        </a>
      </div>
    );
  }
}
