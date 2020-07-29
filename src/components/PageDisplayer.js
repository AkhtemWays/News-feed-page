import React, { Component } from "react";
import { connect } from "react-redux";

class PageDisplayer extends Component {
  render() {
    return (
      <>
        <p>
          {this.props.currentPage} из {this.props.amtPages}
        </p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentPage: state.data.currentPage,
  amtPages: state.data.amtPages,
});

export default connect(mapStateToProps, null)(PageDisplayer);
