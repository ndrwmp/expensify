// import React and IndecisionApp
import React from 'react'; // this is ES6, equivalent to ES5's: var React = require('react');
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense, removeExpense, editExpense } from './actions/expenses';
import { setTextFilter, setStartDate, setEndDate, sortByAmount, sortByDate } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import 'normalize.css/normalize.css'; // make sure all browsers start from the same place
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

const jsx = (
    // store is from line 14
    <Provider store={store}> 
        <AppRouter /> 
    </Provider> 
);

ReactDOM.render(jsx, document.getElementById("app"));