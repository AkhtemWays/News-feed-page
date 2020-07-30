import React, { Component } from "react";
import GridStructure from "./GridStructure";
import ListStructure from "./ListStructure";
import { connect } from "react-redux";

class Display extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.listSelected ? (
          <ListStructure />
        ) : (
          this.props.normalizedData.map((postBatch, index) => (
            <GridStructure postBatch={postBatch} key={index} />
          ))
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listSelected: state.data.listSelected,
    normalizedData: state.data.normalizedData,
  };
};

export default connect(mapStateToProps, null)(Display);
