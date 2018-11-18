import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test("should render ExpenseForm without expense data", () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test("should render expense form with expense data", () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
});

test("should render error with invalid expense form submission", () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot(); // should not render p tag
    wrapper.find('form').simulate("submit", {
        preventDefault: () => {}
    });
    // make sure the error isn't blank (make sure it's the error message)
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot(); // should render p tag
});

test("should set description value in state on input change", () => {
    const value = "new description";
    const wrapper = shallow(<ExpenseForm />);
    // change the description in the first input (the one that changes
    // the description)
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
});

test("should set note value in state on textarea change", () => {
    const value = "new note";
    const wrapper = shallow(<ExpenseForm />);
    // change the note in the textarea
    // - the 'e' in onNoteChange() is the second argument to
    // simulate, which sets e.target.value to "new note"
    wrapper.find('textarea').simulate('change', {
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
});

test("should set amount on valid input change", () => {
    const value = '2350';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
});

test("should not set amount on invalid input change", () => {
    const wrapper = shallow(<ExpenseForm />);
    const value = '2350.010';
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe('');
});

test("should call onSubmit prop with valid form submission", () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
    wrapper.find('form').simulate("submit", {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        note: expenses[0].note,
        amount: expenses[0].amount,
        createdAt: expenses[0].createdAt
    });
});

test("should set new date on valid change", () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop("onDateChange")(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test("should set calendarFocused on valid change", () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop("onFocusChange")({ focused: true });
    expect(wrapper.state('calendarFocused')).toBe(true);
});