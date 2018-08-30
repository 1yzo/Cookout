const defaultState = {
    token: '',
    error: ''
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_AUTH_TOKEN':
            return { ...state, token: action.token, error: '' };
        case 'REMOVE_AUTH_TOKEN':
            return { ...state, token: '' };
        case 'SET_AUTH_ERROR':
            return { ...state, error: action.error };
        default: 
            return state;
    }
}