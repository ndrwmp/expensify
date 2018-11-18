import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test("should set up remove expense action object", () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: "REMOVE_EXPENSE",
        id: '123abc'
    });
});

test("should set up add expense action object with provided values", () => {
    const expense = {
        description: 'Rent',
        amount: 85000,
        createdAt: 100000,
        note: 'last month\'s rent'
    };

    const action = addExpense(expense);
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: {
            ...expense,
            id: expect.any(String)
        }
    });
});

test("should set up add expense action object with defaults", () => {
    const action = addExpense({ id: '123abc' });
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: {
            id: expect.any(String),
            description: '',
            amount: 0,
            createdAt: 0,
            note: ''
        }
    });
});

test("should set up edit expense action object", () => {
    const action = editExpense( '123abcd', { note: 'new note' } );
    expect(action).toEqual({
        type: "EDIT_EXPENSE",
        id: '123abcd',
        updates: { 
            note: 'new note'
        }
    });
});