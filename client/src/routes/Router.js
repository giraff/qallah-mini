import React, { Fragment } from "react";
import Main from "../pages/Main";
import LoginRoute from "./login/LoginRoute";
import RegisterRoute from "./register/RegisterRoute";
import Login from "../pages/Login"
import Register from "../pages/Register"
import ToMeMain from "../pages/tome/ToMeMain"
import ToMeDetail from "../pages/tome/ToMeDetail"
import ToMeHistory from "../pages/tome/ToMeHistory"
import ToMeDone from "../pages/tome/ToMeDone"

import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";

const AllRouter = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Main} />
         { /*<LoginRoute />
          <RegisterRoute />
         <QuestiontomeRoute /> */ }
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/tome" exact component={ToMeMain} />
          <Route path="/tome/detail" exact component={ToMeDetail} />
          <Route path="/tome/history" exact component={ToMeHistory} />
          <Route path="/tome/done" exact component={ToMeDone} />
          <Redirect from="*" to="/"></Redirect>
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};

export default AllRouter;
