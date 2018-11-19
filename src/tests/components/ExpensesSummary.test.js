import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test("should render total for two expenses and pluralize correctly", () => {
    const wrapper = shallow(<ExpensesSummary
        expensesCount={2}
        expensesTotal={selectExpensesTotal([expenses[0], expenses[1]])}
    />);
    expect(wrapper).toMatchSnapshot();
});

test("should render total for one expense and pluralize correctly", () => {
    const wrapper = shallow(<ExpensesSummary
        expensesCount={1}
        expensesTotal={selectExpensesTotal([expenses[0]])}
    />);
    expect(wrapper).toMatchSnapshot();
})