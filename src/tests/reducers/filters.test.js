import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test("should setup default filter values", () => {
    const state = filtersReducer(undefined, { type: "@@INIT"});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test("should set sortBy to amount", () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe("amount");
});

test("should set sortBy to date", () => {
    const state = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
    const filteredState = filtersReducer(state, { type: 'SORT_BY_DATE' });
    expect(filteredState.sortBy).toBe("date");
});

test("should set text filter", () => {
    const action = {
        type: "SET_TEXT_FILTER",
        text: "filter"
    }
    const filteredState = filtersReducer(undefined, action);
    expect(filteredState.text).toBe("filter");
});

test("should set start date filter", () => {
    const startDate = moment();
    const action = {
        type: "SET_START_DATE",
        startDate
    }
    const filteredState = filtersReducer(undefined, action);
    expect(filteredState.startDate).toEqual(startDate);
});

test("should set end date filter", () => {
    const endDate = moment();
    const action = {
        type: "SET_END_DATE",
        endDate
    }
    const filteredState = filtersReducer(undefined, action);
    expect(filteredState.endDate).toEqual(endDate);
});