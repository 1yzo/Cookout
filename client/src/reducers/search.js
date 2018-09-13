const defaultState = {
    address: '',
    location: {}
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_SEARCH':
            return {
                address: action.address,
                location: action.location
            };
        default:
            return state;
    }
}