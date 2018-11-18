import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = (
    { 
        description = "", 
        note = "", 
        amount = 0, 
        createdAt = 0
    // deconstructing the object, setting defaults, and if the entire array doesn't exist,
    // we defualt it to an empty object {}
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE

const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// SET_TEXT_FILTER

const setTextFilter = (text = "") => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE
const setStartDate = (startDate = undefined) => ({
    type: 'SET_START_DATE',
    startDate
});

// SET_END_DATE
const setEndDate = (endDate = undefined) => ({
    type: 'SET_END_DATE',
    endDate
});

// expenses reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            // weird syntax: returns the concatenation of the old array with action.expense
            return [
                ...state, action.expense
            ];
            // return state.concat(action.expense);
        case 'REMOVE_EXPENSE':
            // return new array with expenses after filtering out the
            // expense with the given id from the previous array
            // if the function returns true, the item is kept
            // if the function returns false, the item is removed
            // so we check if the id is NOT the same, therefore
            // we allow all the ones whose IDs are different than the given
            // id to stay in the array, and the one whose ID is the same
            // gets filtered out
            // we use object destructuring here to get id, the first
            // argument in the expense object array that was passed in
            // so basically there are imaginary commas after it
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                // only edit the expense if it's the right object
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates // overrides the conflicting ones
                    };
                } else
                    return expense; // do nothing
            });
        default:
            return state;
    }
};

// filters reducer
const filtersReducerDefaultState = { 
    text: "", 
    sortBy: "date", 
    startDate: undefined, 
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: "date"
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: "amount"
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    }
};

// get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate != 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        // show most recent first (higher createdAt value)
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        // show most expenise first (higher amount value)
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

// store creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'rent', amount: 85000, createdAt: 1000}));
const expenseTwo = store.dispatch(addExpense({ description: 'coffee', amount: 300, createdAt: -1000}));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// // update price of coffee from 300 to 500
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());

// store.dispatch(setEndDate(1000));
// store.dispatch(setEndDate());

const demoState = {
    expenses: [{
        id: 'opasdflpasdf',
        description: 'January\'s rent',
        note: 'Final payment before moving out',
        amount: 85000,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
};

