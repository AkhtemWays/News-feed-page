import React, { Component } from "react";
import GridStructure from "./GridStructure";
import ListStructure from "./ListStructure";
import { connect } from "react-redux";

class Display extends Component {
  constructor(props) {
    super(props);

    this.state = {
      normalizedData: [],
    };
  }

  render() {
    return (
      <React.Fragment>
        {this.props.listSelected ? (
          <ListStructure />
        ) : (
          this.state.normalizedData.map((postBatch, index) => (
            <GridStructure postBatch={postBatch} key={index} />
          ))
        )}
      </React.Fragment>
    );
  }
  componentDidMount() {
    let splitter = 0;
    let toInsert = [];
    const fullBatches = Math.floor(this.props.fetchedData.length / 3);
    const totalItemsOfFullBatches = fullBatches * 3;
    const remainder = this.props.fetchedData.length % 3;
    for (let i = 0; i < totalItemsOfFullBatches; i++) {
      toInsert.push(this.props.fetchedData[i]);
      splitter++; // делю по 3 части для удобства помещения в GridStructure компонент
      if (splitter === 3) {
        splitter = 0;
        this.state.normalizedData.push(toInsert);
        toInsert = [];
      }
    }
    toInsert = [];
    for (let i = 0; i < remainder; i++) {
      toInsert.push(this.props.fetchedData[totalItemsOfFullBatches + i]);
    }
    this.state.normalizedData.push(toInsert);
    console.log(this.state.normalizedData);
  }
}

const mapStateToProps = (state) => {
  return {
    listSelected: state.data.listSelected,
    fetchedData: state.data.fetchedData,
  };
};

export default connect(mapStateToProps, null)(Display);
