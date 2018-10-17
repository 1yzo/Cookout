import authReducer from '../../reducers/auth';

const defaultState = {
    token: '',
    error: ''
};

describe('Auth reducer', () => {
    it('correctly sets default state', () => {
        const state = authReducer(undefined, { type: '@@INIT' });
        expect(state).toEqual(defaultState); 
    });

    it('should set the token and remove any error', () => {
        const token = 'abc123'
        const state = authReducer(defaultState, {
            type: 'SET_AUTH_TOKEN',
            token
        });
        expect(state).toEqual({
            token,
            error: ''
        });
    });

    it('should remove remove the token', () => {
        const state = authReducer(defaultState, { type: 'REMOVE_AUTH_TOKEN' });
        expect(state).toEqual({
            token: '',
            error: ''
        });
    });
}); 