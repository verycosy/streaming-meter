import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Main from "../Routes/Main";
import Result from "../Routes/Result";

export default () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/result/:id" exact component={Result} />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);
