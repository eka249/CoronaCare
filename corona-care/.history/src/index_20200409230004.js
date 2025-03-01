import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import NavBar from "./NavBar";
import * as serviceWorker from "./serviceWorker";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  NavLink
} from "react-router-dom";

ReactDOM.render(
  <Router>
    <App />
    {/* <Switch>
<Route path = "/myconvos" render = {routerProps => {
    <Messages {...routerProps}/>
}}/>
      </Switch> */}
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
