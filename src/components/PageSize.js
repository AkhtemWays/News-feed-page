import React from "react";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import "../static/selectElements.css";

function PageSize(props) {
  return (
    <Field
      component="select"
      name="pageSize"
      className="custom-select ml-1"
      style={{ width: "100px" }}
    >
      {props.pageAmtOptions.map((val) =>
        val === props.pageSize ? (
          <option
            name={`pagesize${val}`}
            value={val}
            defaultValue={val}
            key={val}
          >
            {val}
          </option>
        ) : (
          <option name={`pagesize${val}`} value={val} key={val}>
            {val}
          </option>
        )
      )}
    </Field>
  );
}
const ReduxFormComponent = reduxForm({
  form: "pageSize",
})(PageSize);

const mapStateToProps = (state) => {
  const selector = formValueSelector("pageSize");
  const selectedpageSize = selector(state, "pageSize");
  return {
    pageSize: selectedpageSize ? selectedpageSize : state.data.pageSize,
    pageAmtOptions: state.data.pageAmtOptions,
  };
};

export default connect(mapStateToProps, null)(ReduxFormComponent);
