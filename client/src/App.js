import React from 'react';
// App.js의 역할 : root file. Redux store와 router 결합시키기

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store';

import AllRouter from './routes/Router';

const App = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <AllRouter />
        </ConnectedRouter>
    </Provider>
);

export default App;
