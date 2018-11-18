import moment from 'moment';
import { 
    setStartDate, 
    setEndDate, 
    sortByAmount, 
    sortByDate, 
    setTextFilter 
} from '../../actions/filters';

test("should generate set start date for action object", () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});

test("should generate set end date for action object", () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    });
});

test("should generate sort_by_amount type for action object", () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    });
});

test("should generate sort_by_date type for action object", () => {
    expect(sortByDate()).toEqual({
        type: 'SORT_BY_DATE'
    });
});

test("should generate set text filter for action object with default value", () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});

test("should generate set text filter for action object with provided value", () => {
    const action = setTextFilter('bill')
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: "bill"
    });
});
