import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = (props) => {
    const filteredExpensesCount = props.unfilteredExpensesCount-props.filteredExpensesCount;
    const filteredExpenseWord = (props.filteredExpensesCount === 1 ) ? 'expense' : 'expenses';
    const unfilteredExpenseWord = (filteredExpensesCount === 1 ) ? 'expense' : 'expenses';
    const formattedExpensesTotal = numeral(props.filteredExpensesTotal / 100).format('$0,0.00');

    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{props.filteredExpensesCount}</span> {filteredExpenseWord} totalling <span>{ formattedExpensesTotal }</span>.</h1>
                <h3 className="page-header__title">Filtering <span>{filteredExpensesCount}</span> {unfilteredExpenseWord} from view.</h3>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const filteredExpenses = selectExpenses(state.expenses, state.filters);
    return {
        unfilteredExpensesCount: state.expenses.length,
        filteredExpensesCount: filteredExpenses.length,
        filteredExpensesTotal: selectExpensesTotal(filteredExpenses)
    };
};

export default connect(mapStateToProps)(ExpensesSummary);