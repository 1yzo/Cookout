import filtersReducer from '../../reducers/filters';

const defaultState = {
    distance: 10,
    occupancy: null,
    price: ''
};

describe('Filters reducer', () => {
    it('correctly sets default state', () => {
        const state = filtersReducer(undefined, { type: '@@INIT' });
        expect(state).toEqual(defaultState);
    });

    it('sets the distance filter', () => {
        const distance = 20;
        const state = filtersReducer(defaultState, {
            type: 'SET_DISTANCE_FILTER',
            distance
        });
        expect(state).toEqual({
            ...defaultState,
            distance
        });
    });

    it('sets the occupancy filter', () => {
        const occupancy = 5;
        const state = filtersReducer(defaultState, {
            type: 'SET_OCCUPANCY_FILTER',
            occupancy
        });
        expect(state).toEqual({
            ...defaultState,
            occupancy
        });
    });

    it('sets the price filter to a direction', () => {
        const direction = 'INCREASING';
        const state = filtersReducer(defaultState, {
            type: 'SET_PRICE_FILTER',
            direction
        });
        expect(state).toEqual({
            ...defaultState,
            price: direction
        });
    });
});
