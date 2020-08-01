import React, { Component } from "react";
import { connect } from "react-redux";
import { setPage } from "../store/actions";

class PageDisplayer extends Component {
  componentWillUpdate(nextProps, nextState) {
    if (
      nextProps.currentPage === this.props.currentPage &&
      this.props.amtPages === nextProps.amtPages &&
      this.props.availablePages === nextProps.availablePages
    ) {
      console.log("update prevented");
      return;
    }
  }
  render() {
    return (
      <div>
        {this.props.availablePages.map((page) => (
          <button
            onClick={() => this.props.setPage(page)}
            value={page}
            className={`btn btn-${
              this.props.currentPage === page ? "primary" : "secondary"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentPage: state.data.currentPage,
  amtPages: state.data.amtPages,
  availablePages: state.data.availablePages,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setPage: (values) => dispatch(setPage(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageDisplayer);
