import React, { Component } from "react";
import "../static/main.css";
import Header from "./Header";
import Display from "./Display";
import { fetchPosts, cancelStart } from "../store/actions";
import { connect } from "react-redux";

class Content extends Component {
  componentWillMount() {
    if (this.props.isStart) {
      this.props.fetchPosts();
      this.props.cancelStart();
    }
  }
  render() {
    return (
      <div className="container">
        <Header />
        <Display />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    cancelStart: () => dispatch(cancelStart()),
  };
};

const mapStateToProps = (state) => ({
  isStart: state.data.isStart,
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
