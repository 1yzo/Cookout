import userReducer from '../../reducers/user';

const defaultState = {
    _id: '',
    userName: '',
    password: '',
    bookings: [],
    saved: [],
    listings: []
};

describe('User reducer', () => {
    it('sets the default state', () => {
        const state = userReducer(undefined, { type: '@@INIT' });
        expect(state).toEqual(defaultState);
    });

    it('sets the user object', () => {
        const user = { name: 'Osman' };
        const state = userReducer(defaultState, {
            type: 'SET_USER',
            user
        });
        expect(state).toEqual(user);
    });

    it('removes the user', () => {
        const state = userReducer(defaultState, { type: 'REMOVE_USER' });
        expect(state).toEqual(defaultState);
    });

    it('sets the listings property of the user', () => {
        const listings = ['a', 'b', 'c'];
        const state = userReducer(defaultState, {
            type: 'SET_LISTINGS',
            listings
        });
        expect(state).toEqual({
            ...defaultState,
            listings
        });
    });
});