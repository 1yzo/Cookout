import React from 'react';
import { connect } from 'react-redux';
import { setDistanceFilter, setOccupancyFilter, setPriceFilter } from '../actions/filters';

class Filter extends React.Component {
    state = {
        distance: this.props.distance,
        occupancy: this.props.occupancy ? this.props.occupancy : '',
        price: this.props.price,
        filterType: this.props.children.toLowerCase()
    };

    handleDistanceChange = (e) => {
        const distance = e.target.value;
        this.setState(() => ({ distance }));
    }

    handleOccupancyChange = (e) => {
        const occupancy = e.target.value;
        this.setState(() => ({ occupancy }));
    }

    applyChanges = () => {
        const { dispatch, filterType: filterToChange } = this.props;
        switch (filterToChange) {
            case 'distance':
                dispatch(setDistanceFilter(Number(this.state.distance)));
                break;
            case 'occupancy':
                dispatch(setOccupancyFilter(Number(this.state.occupancy)));
                break;
            case 'price':
                dispatch(setPriceFilter(this.state.price));
                break;
            default:
                break;
        }
    }
    
    render() {
        const { filterType } = this.state;
        return (
            <div className="filter" onClick={this.props.onClick} id={filterType}>
                {this.props.children}
                {this.props.isActive &&
                    <div className="filter__tooltip" onClick={this.handleToolTipClick}>
                        {filterType === 'distance' &&
                            <div className="filter__inner">
                                <input type="text" value={this.state.distance} onChange={this.handleDistanceChange} />
                            </div>}
                        {filterType === 'occupancy' &&
                        <div className="filter__inner">
                            <input type="text" value={this.state.occupancy} onChange={this.handleOccupancyChange} />
                        </div>}
                        <button onClick={this.applyChanges}>Apply</button>
                    </div>}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    distance: state.filters.distance,
    occupancy: state.filters.occupancy,
    price: state.filters.price
});

export default connect(mapStateToProps)(Filter);