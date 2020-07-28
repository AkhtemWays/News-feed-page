import React, { Component } from "react";
import Header from "./components/Header";
import Display from "./components/Display";
import problemSolver from "./store/fetchReducer";
import "./static/main.css";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { reducer as formReducer } from "redux-form";

const store = createStore(
  combineReducers({
    data: problemSolver,
    form: formReducer,
  }),
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <Header />
          <Display />
        </div>
      </Provider>
    );
  }
}
