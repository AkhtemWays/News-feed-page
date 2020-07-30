import React, { Component } from "react";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { getFormValues } from "redux-form";
import { setPagination } from "../store/actions";

class PageSize extends Component {
  render() {
    return (
      <Field component="select" name="pageSize">
        {this.props.pageAmtOptions.map((val) =>
          val == this.props.pageSize ? (
            <option name={`pagesize${val}`} value={val} selected>
              {val}
            </option>
          ) : (
            <option name={`pagesize${val}`} value={val}>
              {val}
            </option>
          )
        )}
      </Field>
    );
  }
}
const ReduxFormComponent = reduxForm({
  form: "pageSize",
})(PageSize);

const mapStateToProps = (state) => {
  const selector = formValueSelector("pageSize");
  const selectedpageSize = selector(state, "pageSize");
  return {
    pageSize: selectedpageSize,
    pageAmtOptions: state.data.pageAmtOptions,
  };
};

const component = connect(mapStateToProps, null)(ReduxFormComponent);

export default connect((state) => ({
  values: getFormValues("pageSize")(state),
}))(component);
