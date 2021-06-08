import React, { Fragment } from 'react';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import Main from '../pages/Main';
import LoginRoute from './login/LoginRoute';
import RegisterRoute from './register/RegisterRoute';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ToMeMain from '../pages/tome/ToMeMain';
import ToMeDetail from '../pages/tome/ToMeDetail';
import ToMeHistory from '../pages/tome/ToMeHistory';
import ToMeDone from '../pages/tome/ToMeDone';
import ByOtherMain from '../pages/byother/ByOtherMain';
import ByOtherDetail from '../pages/byother/ByOtherDetail';
import ByOtherDone from '../pages/byother/ByOtherDone';
import ByOtherHistory from '../pages/byother/ByOtherHistory';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';

const AllRouter = () => (
    <>
        <BrowserRouter>
            <div id="wrapper">
                <Header />
                <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/login" exact component={props => <Login {...props} />} />
                    <Route path="/register" exact component={props => <Register {...props} />} />
                    <Route path="/tome" exact component={props => <ToMeMain {...props} />} />
                    <Route path="/tome/detail" exact component={props => <ToMeDetail {...props} />} />
                    <Route path="/tome/history" exact component={props => <ToMeHistory {...props} />} />
                    <Route path="/tome/done" exact component={props => <ToMeDone {...props} />} />
                    <Route path="/byother/detail/:id" exact component={props => <ByOtherDetail {...props} />} />
                    <Route path="/byother" exact component={props => <ByOtherMain {...props} />} />
                    <Route path="/byother/done" exact component={props => <ByOtherDone {...props} />} />
                    <Route path="/byother/history" exact component={props => <ByOtherHistory {...props} />} />

                    <Route path="/experience" exact component={props => <ByOtherHistory {...props} />} />
                    <Route path="/experience/form" exact component={props => <ByOtherHistory {...props} />} />
                    <Route path="/experience/done" exact component={props => <ByOtherHistory {...props} />} />
                    <Route path="/reflection" exact component={props => <ByOtherHistory {...props} />} />
                    <Route path="/reflection/detail" exact component={props => <ByOtherHistory {...props} />} />
                    <Route path="/reflection/done" exact component={props => <ByOtherHistory {...props} />} />
                    <Route path="/reflection/history" exact component={props => <ByOtherHistory {...props} />} />

                    <Redirect from="*" to="/" />
                </Switch>
                <Footer />
            </div>
        </BrowserRouter>
    </>
);

export default AllRouter;
