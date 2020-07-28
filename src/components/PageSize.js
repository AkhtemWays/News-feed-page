import React, { Component } from "react";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { getFormValues } from "redux-form";
import { setPagination } from "../store/actions";

class PageSize extends Component {
  render() {
    return (
      <Field
        component="select"
        name="pageSize"
        defaultValue={4}
        onChange={setPagination}
      >
        {this.props.pageSizeOptions.map((val) =>
          val == this.props.pageSize ? (
            <option name={val} value={val} selected>
              {val}
            </option>
          ) : (
            <option value={val}>{val}</option>
          )
        )}
      </Field>
    );
  }
}
export const ReduxFormComponent = reduxForm({
  form: "pageSize",
})(PageSize);

const mapStateToProps = (state) => {
  const selector = formValueSelector("pageSize");
  const selectedPageSize = selector(state, "pageSize");
  return {
    pageSize: selectedPageSize,
    pageSizeOptions: state.data.pageSizeOptions,
  };
};
const mapDispatchToProps = {
  setPagination,
};

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxFormComponent);

export default connect((state) => ({
  values: getFormValues("pageSize")(state),
}))(component);
