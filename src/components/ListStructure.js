import React, { Component } from "react";
import "../static/ListStructure.css";
import { connect } from "react-redux";

function ListStructure(props) {
  return props.isDefaultSort
    ? props.paginatedData.map((post, index) => (
        <div className="box-list" key={index}>
          <div className="img-field">
            <img src={post.imgUrl} alt="nothing for you" />
          </div>
          <div className="text-field">
            <div className="link-field">
              <a href="#">
                <h5>{post.title}</h5>
              </a>
            </div>
            <div className="plain-field">
              <p>{post.body}</p>
            </div>
          </div>
        </div>
      ))
    : props.sortedByDatePaginatedData.map((post, index) => (
        <div className="box-list" key={index}>
          <div className="img-field">
            <img src={post.imgUrl} alt="nothing for you" />
          </div>
          <div className="text-field">
            <div className="link-field">
              <a href="#">
                <h5>{post.title}</h5>
              </a>
            </div>
            <div className="plain-field">
              <p>{post.body}</p>
            </div>
          </div>
        </div>
      ));
}

const mapStateToProps = (state) => {
  return {
    paginatedData: state.data.paginatedData,
    sortedByDatePaginatedData: state.data.sortedByDatePaginatedData,
    isDefaultSort: state.data.isDefaultSort,
  };
};

export default connect(mapStateToProps, null)(ListStructure);
