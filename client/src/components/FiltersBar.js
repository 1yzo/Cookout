import React from 'react';
import { connect } from 'react-redux';

class FiltersBar extends React.Component {
    state = {
        selectedFilter: ''
    };
    
    render() {
        return (
            <div className="filters-bar">
                <div className="filter">Distance</div>
                <div className="filter">Occupancy</div>
                <div className="filter">Price</div>
            </div>
        );
    }
}

export default FiltersBar;