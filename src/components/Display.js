import React from "react";
import GridStructure from "./GridStructure";
import ListStructure from "./ListStructure";
import { connect } from "react-redux";

const Display = (props) => {
  return (
    <React.Fragment>
      {props.listSelected ? (
        <ListStructure />
      ) : props.isDefaultSort ? (
        props.normalizedData.map((postBatch, index) => (
          <GridStructure postBatch={postBatch} key={index} />
        ))
      ) : (
        props.sortedByDateNormalizedData.map((postBatch, index) => (
          <GridStructure postBatch={postBatch} key={index} />
        ))
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    listSelected: state.data.listSelected,
    normalizedData: state.data.normalizedData,
    sortedByDateNormalizedData: state.data.sortedByDateNormalizedData,
    isDefaultSort: state.data.isDefaultSort,
  };
};

export default connect(mapStateToProps, null)(Display);
