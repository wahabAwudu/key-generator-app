import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

// Route Views
import Home from "../views/Home";
import Detail from "../views/Detail";

const DashboardRoutes = props => {

  return (
    <Switch>
      <Route exact path={props.match.path} component={Home} />
      <Route exact path={`${props.match.path}/:id`} component={Detail} />
    </Switch>
  );
};
export default DashboardRoutes;
