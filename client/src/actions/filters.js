export const setDistanceFilter = (distance) => ({
    type: 'SET_DISTANCE_FILTER',
    distance
});

export const setOccupancyFilter = (occupancy) => ({
    type: 'SET_OCCUPANCY_FILTER',
    occupancy
});

export const setPriceFilter = (direction) => ({
    type: 'SET_PRICE_FILTER',
    direction
});