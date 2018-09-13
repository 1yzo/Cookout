import React from 'react';
import { connect } from 'react-redux';
import LocationSearchInput from './LocationSearchInput';
import { setSearch } from '../actions/search';

import '../styles/pages.css';

class LandingPage extends React.Component {
    state = {
        address: '',
        location: undefined
    };

    handleAddressChange = (address) => {
        this.setState(() => ({ address }));
    }

    setLocation = (location) => {
        this.setState(() => ({ location }));
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.setSearch(this.state.address, this.state.location);
        this.props.history.push('/search');
    }
    
    render() {
        return (
            <div className="page landing-page">
                <form onSubmit={this.handleSubmit}>
                    <LocationSearchInput
                        handleAddressChange={this.handleAddressChange}
                        address={this.state.address} 
                        setLocation={this.setLocation}
                    />
                    <button>Search</button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setSearch: (address, location) => {
        dispatch(setSearch(address, location));
    }
});

export default connect(null, mapDispatchToProps)(LandingPage);