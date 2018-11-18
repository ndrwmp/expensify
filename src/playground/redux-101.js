import { createStore } from 'redux';

// Action generators - functions that return action objects
// makes code DRYer

// if incrementBy isn't set, default to 1
const incrementCount = ({ incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
    // incrementBy: incrementBy
    // incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
});

const decrementCount = ({ decrementBy = 1}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({ count }) => ({
    type: 'SET',
    count
});

const resetCount = () => ({
    type: 'RESET',
    count: 0
});

// Reducers
// 1. Reducers are pure functions: they don't require any variables or anything outside
//      of the function
// 2. They never change the state or action, only return a new object representing
//      new state

const countReducer = (state = { count: 0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        
        case 'DECREMENT':
            // const decrementBy = typeof action.decrementBy === "number" ? action.decrementBy : 1;
            return {
                count: state.count - action.decrementBy
            };
        
        case 'RESET':
            return {
                count: 0
            };
        
        case 'SET':
            return {
                count: action.count
            };
        default: 
            return state;
    }
};

const store = createStore(countReducer);

// every time the state changes, do this
const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(incrementCount({incrementBy: 5}));

// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// });

// stop doing the console.log() every time the state changes
// unsubscribe();

store.dispatch(resetCount());

store.dispatch(decrementCount({decrementBy: 10}));

store.dispatch(setCount({count: 10}));