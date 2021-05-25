import React, { Fragment } from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Main from '../pages/Main';

import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';

const AllRouter = () => {
  return(
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Main}/>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />        
          <Redirect from="*" to="/"></Redirect>
        </Switch>
      </BrowserRouter>
    </Fragment>  
  );
};

export default AllRouter;