import React, { Component } from "react";
import Cell from "./Cell";
import "../static/GridStructure.css";

export default function GridStructure(props) {
  return (
    props.postBatch && (
      <div className="box-grid">
        {props.postBatch.map((post, index) => (
          <Cell key={index} post={post} />
        ))}
      </div>
    )
  );
}
