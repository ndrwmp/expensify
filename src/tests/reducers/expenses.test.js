import expenses from '../fixtures/expenses';
import expensesReducer from '../../reducers/expenses';

test("should set default state to empty array", () => {
    const state = expensesReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual([]);
});

test("should remove expense by id", () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expense if id not found", () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: '-1'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test("should add expense", () => {
    const action = {
        type: "ADD_EXPENSE",
        expense: {
            id: '100',
            description: 'newly added',
            note: '',
            amount: 10000,
            createdAt: 0
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([ ...expenses, action.expense ]);
});

test("should edit expense", () => {
    const action = {
        type: "EDIT_EXPENSE",
        id: expenses[0].id,
        updates: {
            description: 'gum2'
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state[0].description).toBe("gum2");
    // expect(state).toEqual([{ ...expenses[0], ...action.updates}, expenses[1], expenses[2]]);
});

test("should not edit expense if id not found", () => {
    const action = {
        type: "EDIT_EXPENSE",
        id: '-1',
        updates: {
            description: 'gum2'
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});