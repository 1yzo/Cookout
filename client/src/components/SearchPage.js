import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LocationSearchInput from './LocationSearchInput';
import { setSearch } from '../actions/search';
import FiltersBar from './FiltersBar';

class SearchPage extends React.Component {
    state = {
        address: this.props.address ? this.props.address : '',
        location: this.props.location ? this.props.location : undefined,
        mileRange: 10,
        listings: []
    };
    
    handleAddressChange = (address) => {
        this.setState(() => ({ address }));
    }

    setLocation = (location) => {
        this.setState(() => ({ location }));
    }
    
    handleNewLocationSubmit = (e) => {
        e.preventDefault();
        this.props.setSearch(this.state.address, this.state.location);
        this.replaceListings();
    }
    
    replaceListings = () => {
        fetch(`/listings/?lat=${this.state.location.lat}&lng=${this.state.location.lng}&range=${this.state.mileRange}`)
            .then(res => res.json())
            .then(res => {
                this.setState(() => ({ listings: [...res] }));
            })
            .catch(err => { console.log(err) });
    }
    
    componentDidMount() {
        if (this.state.location) {
           this.replaceListings();
        }
    }
    
    render() {
        return (
            <div>
                <div className="search-section">
                    <form className="search-page__form" onSubmit={this.handleNewLocationSubmit}>
                        <LocationSearchInput
                            handleAddressChange={this.handleAddressChange}
                            address={this.state.address} 
                            setLocation={this.setLocation}
                        />
                        <button>Search</button>
                    </form>
                    <FiltersBar />
                    <h2 className="address-tag">Showing results near {this.props.address}</h2>
                </div>
                <div className="page page--search-page">
                    {this.state.listings.map((listing) => (
                        <Link key={listing._id} to={`/view-listing/${listing._id}`}>
                            <div className="listing-card">
                                <img src={listing.image} alt="main"/>
                                <div>
                                    <h3>{listing.address}</h3>
                                    <h3>Description: {listing.description}</h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    address: state.search.address,
    location: state.search.location
});

const mapDispatchToProps = (dispatch) => ({
    setSearch: (address, location) => {
        dispatch(setSearch(address, location));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);