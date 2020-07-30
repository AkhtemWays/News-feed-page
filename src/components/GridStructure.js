import React, { Component } from "react";
import Cell from "./Cell";
import "../static/GridStructure.css";

export default class GridStructure extends Component {
  render() {
    return (
      this.props.postBatch && (
        <div className="box-grid">
          {this.props.postBatch.map((post, index) => (
            <Cell key={index} post={post} />
          ))}
        </div>
      )
    );
  }
}
