import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListItem } from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';

test("should render expense list item", () => {
    const wrapper = shallow(<ExpenseListItem key={expenses[0]} { ...expenses[0] }/>);
    expect(wrapper).toMatchSnapshot();
});