import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import * as actions from '../../actions/auth';

const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);

describe('auth actions', () => {
    afterEach(() => {
        fetchMock.reset();
    });
    
    it('should generate set auth token action object', () => {
        const token = 'abc123';
        const action = actions.setAuthToken(token);
        expect(action).toEqual({
            type: 'SET_AUTH_TOKEN',
            token
        });
    });

    it('should generate remove auth token action object', () => {
        const action = actions.removeAuthToken();
        expect(action).toEqual({ type: 'REMOVE_AUTH_TOKEN' });
    });

    it('should generate set auth error action object', () => {
        const error = 'wrongggg!!!';
        const action = actions.setAuthError(error);
        expect(action).toEqual({
            type: 'SET_AUTH_ERROR',
            error 
        });
    });

    it('should dispatch setAuthToken after startSignup if email does not already exist', (done) => {
        const token = 'abc123';
        const user = { id: 'user1' };
        fetchMock.post('/auth/signup', { user });
        fetchMock.post('/auth/login', JSON.stringify(token));
        fetchMock.get('/auth/getUser', { user });
        const expectedActions = [actions.setAuthToken(token)];
        const initialState = {
            auth: {
                token: '',
                error: ''
            }
        };
        const store = mockStore(initialState);
        store.dispatch(actions.startSignup('user@gmail.com', 'password123', 'User'))
            .then(() => {
                const actions = store.getActions();
                expect(actions).toEqual(expectedActions);
                done();
            });
    });

    it ('should dispatch setAuthError after startSignup if email already exists', (done) => {
        const error = 'Error: An account with that email already exists';
        fetchMock.post('/auth/signup', 500);
        const expectedActions = [actions.setAuthError(error)];
        const initialState = {
            auth: {
                token: '',
                error: ''
            }
        };
        const store = mockStore(initialState);
        store.dispatch(actions.startSignup('user@gmail.com', 'password123', 'User'))
            .then(() => {
                const actions = store.getActions();
                expect(actions).toEqual(expectedActions);
                done();
            });
    })
});