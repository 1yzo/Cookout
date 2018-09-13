const defaultState = {
    distance: 10,
    occupancy: null,
    price: ''
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_DISTANCE_FILTER':
            return {
                ...state,
                distance: action.distance
            };
        case 'SET_OCCUPANCY_FILTER':
            return {
                ...state,
                occupancy: action.occupancy
            };
        case 'SET_PRICE_FILTER':
            return {
                ...state,
                price: action.direction
            };
        default:
            return state;
    }
};