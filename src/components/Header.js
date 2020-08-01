import React, { Component } from "react";
import "../static/header.css";
import { connect } from "react-redux";
import { showGrid, showList } from "../store/actions";
import ReduxFormComponent from "./PageSize";
import PageDisplayer from "./PageDisplayer";
import SortOptions from "./sortOptions";

class Header extends Component {
  componentWillUpdate(nextProps, nextState) {
    if (this.props.listSelected !== nextProps.listSelected) {
      nextProps.listSelected === true ? showList() : showGrid();
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="headers" id="view">
          <strong>Вид:</strong>

          <button
            onClick={this.props.showList}
            className={`btn ${
              this.props.listSelected ? "btn-primary" : "btn-light"
            }`}
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-list"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
            {"  "}
            Список
          </button>
          <button
            onClick={this.props.showGrid}
            className={`btn ${
              this.props.listSelected ? "btn-light" : "btn-primary"
            }`}
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-grid"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"
              />
            </svg>
            {"  "}
            Плитка
          </button>
        </div>
        <div className="headers" id="sort">
          <strong>Сортировать:</strong>
          <SortOptions />
        </div>
        <div className="headers" id="quantity">
          <strong>Кол-во:</strong>
          <ReduxFormComponent />
        </div>
        <div className="headers" id="nums">
          <PageDisplayer />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listSelected: state.data.listSelected,
  };
};

const mapDispatchToProps = {
  showList,
  showGrid,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
