import * as actions from '../../actions/search';

describe('search actions', () => {
    it('should generate set search action object', () => {
        const address = '10 Apple Way';
        const location = { lat: 34, lng: 25 };
        const action = actions.setSearch(address, location);
        expect(action).toEqual({
            type: 'SET_SEARCH',
            address,
            location
        });
    });
});