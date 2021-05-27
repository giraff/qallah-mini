import React, { Fragment } from "react";
import Main from "../pages/Main";
import LoginRoute from "./login/LoginRoute";
import RegisterRoute from "./register/RegisterRoute";

import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";

const AllRouter = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Main} />
          <LoginRoute />
          <RegisterRoute />
          <Redirect from="*" to="/"></Redirect>
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};

export default AllRouter;
