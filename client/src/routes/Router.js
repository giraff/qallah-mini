import React, { Fragment } from 'react';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import Main from '../pages/Main';
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
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/tome" exact component={ToMeMain} />
                    <Route path="/tome/detail" exact component={ToMeDetail} />
                    <Route path="/tome/history" exact component={ToMeHistory} />
                    <Route path="/tome/done" exact component={ToMeDone} />
                    <Route path="/byother/detail/:id" exact component={ByOtherDetail} />
                    <Route path="/byother" exact component={ByOtherMain} />
                    <Route path="/byother/done" exact component={ByOtherDone} />
                    <Route path="/byother/history" exact component={ByOtherHistory} />

                    <Route path="/experience" exact component={ByOtherHistory} />
                    <Route path="/experience/form" exact component={ByOtherHistory} />
                    <Route path="/experience/done" exact component={ByOtherHistory} />
                    <Route path="/reflection" exact component={ByOtherHistory} />
                    <Route path="/reflection/detail" exact component={ByOtherHistory} />
                    <Route path="/reflection/done" exact component={ByOtherHistory} />
                    <Route path="/reflection/history" exact component={ByOtherHistory} />

                    <Redirect from="*" to="/" />
                </Switch>
                <Footer />
            </div>
        </BrowserRouter>
    </>
);

export default AllRouter;
