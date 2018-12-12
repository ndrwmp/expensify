import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, 
    removeExpense, setExpenses, startSetExpenses, 
    startRemoveExpense, startEditExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = "testuid";
const defaultAuthState = { auth: { uid: uid } };
const createMockStore = configureMockStore([thunk]);

// populate the test database

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    // don't allow the tests to run until this sample database is populated
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

// remove expense tests

test("should set up remove expense action object", () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: "REMOVE_EXPENSE",
        id: '123abc'
    });
});

test("should remove expense from firebase", (done) => {
    const store = createMockStore(defaultAuthState);

    store.dispatch(startRemoveExpense({ id: expenses[0].id })).then(() => {
        // check if action was correctly dispatched
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id: expenses[0].id
        });

        // check if the data was removed from the database
        return database.ref(`users/${uid}/expenses/${expenses[0].id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(null);
        done();
    });
});

// add expense tests

test("should set up add expense action object with provided values", () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: expenses[2]
    });
});

test("should add expense to database and to store", (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'cus i lost my last one',
        createdAt: 1001
    };
    
    store.dispatch(startAddExpense(expenseData)).then(() => {
        // check if action was correctly dispatched
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        })
        
        // check if correct data was stored in the database
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test("should add expense with defaults to database and to store", (done) => {
    const store = createMockStore(defaultAuthState);
    const defaultExpenseData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };

    
    store.dispatch(startAddExpense({})).then(() => {
        // check if action was correctly dispatched
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...defaultExpenseData
            }
        });

        // check if the default data was stored in the database
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(defaultExpenseData);
        done();
    });
});

// set expenses tests

test("should set up set expense action object with data", () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

// edit expense tests

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

test("should edit expense from firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    const updates = { amount: 2000 };
    const updatedExpense = {
        id: expenses[2].id,
        description: expenses[2].description,
        amount: 2000,
        note: expenses[2].note,
        createdAt: expenses[2].createdAt
    };

    store.dispatch(startEditExpense(id, updates)).then(() => {
        // check if action was correctly dispatched
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });

        // check if the data was removed from the database
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        // expect(snapshot.val()).toEqual(updatedExpense);
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
    });
});

// fetch expenses tests

test("should fetch expenses from firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "SET_EXPENSES",
            expenses
        });
        done();
    });
});