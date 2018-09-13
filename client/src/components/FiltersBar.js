import React from 'react';
import Filter from './Filter';

class FiltersBar extends React.Component {
    state = {
        selectedFilter: ''
    };
    
    handleClick = (e) => {
        // instead of this, pass func tht takes filterType as param and set tht to selectedFilter
        const selectedFilter = e.target.id;
        this.setState(() => ({ selectedFilter }));
    }
    
    closeToolTip = () => {
        this.setState(() => ({ selectedFilter: '' }));
    }
    
    handleFocusChange = (e) => {
        console.log(e.target.parentElement.className, e.target.parentElement.className.includes('filter'))
        if (!e.target.parentElement.className.includes('filter')) {
            this.closeToolTip();
        }
    }

    componentDidMount() {
        window.addEventListener('click', this.handleFocusChange);
    }
    
    componentWillUnmount() {
        window.removeEventListener('click', this.handleFocusChange);
    }

    render() {
        const { selectedFilter } = this.state;
        return (
            <div className="filters-bar">
                <Filter
                    onClick={this.handleClick}
                    isActive={selectedFilter === 'distance'}
                    close={this.closeToolTip}
                >
                    Distance
                </Filter>
                <Filter 
                    onClick={this.handleClick}
                    isActive={selectedFilter === 'occupancy'} 
                    close={this.closeToolTip}
                >
                    Occupancy
                </Filter>
                <Filter 
                    onClick={this.handleClick} 
                    isActive={selectedFilter === 'price'} 
                    close={this.closeToolTip}
                >
                    Price
                </Filter>
            </div>
        );
    }
}

export default FiltersBar;