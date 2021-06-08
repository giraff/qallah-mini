import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../../pages/Login';

const LoginRoute = () => <Route path="/login" exact component={Login} />;

export default LoginRoute;
