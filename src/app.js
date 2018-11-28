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
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import './firebase/firebase';
import './playground/promises';

const store = configureStore();

const jsx = (
    <Provider store={store}> 
        <AppRouter /> 
    </Provider> 
);

ReactDOM.render(jsx, document.getElementById("app"));