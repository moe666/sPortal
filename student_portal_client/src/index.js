import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import decode from "jwt-decode";

import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";

import "semantic-ui-css/semantic.min.css";

import { userLoggedIn } from "./actions/auth";

import App from "./App";
import "./stylesheet/style.scss";
import "bootstrap/dist/css/bootstrap.css";
import rootReducer from "./rootReducer";
import * as serviceWorker from "./serviceWorker";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.userJWT) {
  const payload = decode(localStorage.userJWT);
  const user = {
    token: localStorage.userJWT,
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    confirmed: payload.confirmed,
    isAdmin: payload.isAdmin
  };

  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
