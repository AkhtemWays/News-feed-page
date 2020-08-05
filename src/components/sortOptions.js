import React from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import "../static/selectElements.css";

function SortOptions(props) {
  return (
    <>
      <Field
        component="select"
        name="sortOption"
        className="custom-select ml-1"
        style={{ width: "100px" }}
      >
        {props.sortOptions.map((option, index) =>
          option === props.sortOption ? (
            <option
              name={option}
              value={option}
              defaultValue={option}
              key={index}
            >
              {option}
            </option>
          ) : (
            <option name={option} value={option} key={index}>
              {option}
            </option>
          )
        )}
      </Field>
    </>
  );
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
