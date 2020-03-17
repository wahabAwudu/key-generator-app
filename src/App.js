import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import KeyProvider from "./context/KeyContext";

import "bootstrap/dist/css/bootstrap.min.css";

// auth components
import DashboardRoutes from "./router/dashboardRoutes";
import Home from "./views/Home";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
        <KeyProvider>
          <ToastContainer />
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/home" component={DashboardRoutes} />
            </Switch>
          </Router>
        </KeyProvider>
  );
};

export default App;
