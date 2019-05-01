import React from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Main from "../Routes/Main";
import Result from "../Routes/Result";

export default () => (
  <Router>
    <Switch>
      <Route path={`${process.env.PUBLIC_URL}/`} exact component={Main} />
      <Route
        path={`${process.env.PUBLIC_URL}/result/:id`}
        exact
        component={Result}
      />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);
