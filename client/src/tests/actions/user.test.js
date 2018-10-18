import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import * as actions from '../../actions/user';

const middleWares = [thunk]
const mockStore = configureMockStore(middleWares);

describe('user actions', () => {
    afterEach(() => {
        fetchMock.reset();
    });
    
    it('should generate set user action object', () => {
        const user = { id: 'user1' };
        const action = actions.setUser(user);
        expect(action).toEqual({
            type: 'SET_USER',
            user
        });
    });

    it('should generate remove user action object', () => {
        const action = actions.removeUser();
        expect(action).toEqual({
            type: 'REMOVE_USER'
        });
    });

    it('should generate set listings action object', () => {
        const listings = ['a', 'b', 'c'];        
        const action = actions.setListings(listings);
        expect(action).toEqual({
            type: 'SET_LISTINGS',
            listings
        });
    });

    it('should dispatch setUser after startSetUser', (done) => {
        const token = 'abc123';
        const user = { id: 'user1' };
        fetchMock.get('/auth/getUser', user);
        const expectedActions = [actions.setUser(user)];
        const initialState = {};
        const store = mockStore(initialState);
        store.dispatch(actions.startSetUser(token))
            .then(() => {
                const actions = store.getActions();
                expect(actions).toEqual(expectedActions);
                done()
            });
    });
    
    it('should dispatch setListings after startSetListings', (done) => {
        const listings = ['a', 'b', 'c'];
        const userId = 'user1';
        fetchMock.get(`/users/${userId}`, {
            listings
        });
        const expectedActions = [actions.setListings(listings)]
        const initialState = {};
        const store = mockStore(initialState);
        store.dispatch(actions.startSetListings(userId))
            .then(() => {
                const actions = store.getActions();
                expect(actions).toEqual(expectedActions);
                done();
            });
    });
});