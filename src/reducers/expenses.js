const expensesReducerDefaultState = [];
export default (state = expensesReducerDefaultState, action) => {
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
        case 'SET_EXPENSES':
            return action.expenses;
        default:
            return state;
    }
};