import searchReducer from '../../reducers/search';

const defaultState = {
    address: '',
    location: {}
};

describe('Search reducer', () => {
    it('correctly sets default state', () => {
        const state = searchReducer(undefined, { type: '@@INIT' });
        expect(state).toEqual(defaultState);
    });

    it('sets the search results', () => {
        const address = '5 Apple Way';
        const location = { lat: 5, lng: 6 };
        const state = searchReducer(defaultState, {
            type: 'SET_SEARCH',
            address,
            location
        });
        expect(state).toEqual({
            address,
            location
        });
    });
});