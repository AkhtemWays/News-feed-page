import React, { Component } from "react";
import Content from "./components/Content";
import problemSolver from "./store/fetchReducer";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";
const store = createStore(
  combineReducers({
    data: problemSolver,
    form: formReducer,
  }),
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Content />
      </Provider>
    );
  }
}
