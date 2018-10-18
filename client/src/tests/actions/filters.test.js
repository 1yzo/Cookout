import * as actions from '../../actions/filters';

describe('filters actions', () => {
    it('should generate set distance filter action object', () => {
        const distance = 20;
        const action = actions.setDistanceFilter(distance);
        expect(action).toEqual({
            type: 'SET_DISTANCE_FILTER',
            distance
        });
    });

    it('should generate set occupancy action object', () => {
        const occupancy = 5;
        const action = actions.setOccupancyFilter(occupancy);
        expect(action).toEqual({
            type: 'SET_OCCUPANCY_FILTER',
            occupancy
        });
    });

    it('should generate set price filter action object', () => {
        const price = 'INCREASING';
        const action = actions.setPriceFilter(price);
        expect(action).toEqual({
            type: 'SET_PRICE_FILTER',
            price
        });
    });
});