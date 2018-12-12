import authReducer from '../../reducers/auth';

test("should set uid on login", () => {
    const uid = '123abc';
    const action = {
        type: "LOGIN",
        uid
    };
    const state = authReducer({}, action);
    expect(state.uid).toEqual(uid);
});

test("should clear uid on logout", () => {
    const action = {
        type: "LOGOUT"
    };
    const state = authReducer({ uid: 'sdfasdf' }, action);
    expect(state.uid).toEqual(undefined);
});