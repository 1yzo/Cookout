const defaultState = {
    _id: '',
    userName: '',
    password: '',
    bookings: [],
    saved: [],
    listings: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...action.user };
        case 'REMOVE_USER':
            return defaultState;
        case 'SET_LISTINGS':
            return {
                ...state,
                listings: [ ...action.listings ]
            };
        default:
            return state;
    }
};