import React from 'react'; // this is ES6, equivalent to ES5's: var React = require('react');
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import './playground/promises';

const store = configureStore();

const jsx = (
    <Provider store={store}> 
        <AppRouter /> 
    </Provider> 
);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById("app"));
        hasRendered = true;
    }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById("app"));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            // if user is on log in page and they logged in, redirect to dashboard
            if (history.location.pathname === "/") {
                history.push("/dashboard");
            }
        });
    } else {
        store.dispatch(logout());
        renderApp();
        history.push("/");
    }
});