import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";

class SortOptions extends Component {
  render() {
    return (
      <>
        <Field component="select" name="sortOption">
          {this.props.sortOptions.map((option) =>
            option === this.props.sortOption ? (
              <option name={option} value={option} selected>
                {option}
              </option>
            ) : (
              <option name={option} value={option}>
                {option}
              </option>
            )
          )}
        </Field>
      </>
    );
  }
}

const ReduxFormSortOptions = reduxForm({
  form: "sortOption",
})(SortOptions);

const mapStateToProps = (state) => {
  const selector = formValueSelector("sortOption");
  const selectedSortOption = selector(state, "sortOption");
  return {
    sortOption: selectedSortOption ? selectedSortOption : state.data.sortOption,
    sortOptions: state.data.sortOptions,
  };
};

export default connect(mapStateToProps, null)(ReduxFormSortOptions);
