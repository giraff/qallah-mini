import React from "react";
import { Route } from "react-router-dom";
import Register from "../../components/register/Register";


const RegisterRoute = () => {
  return <Route path="/register" exact component={Register} />;
};

export default RegisterRoute;
