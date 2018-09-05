import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startSetListings } from '../actions/user';

class HostPage extends React.Component {
    state = {
        listings: []
    };
    
    loadListings =  () => {
        const { listingIds } = this.props;
        for (let i of listingIds) {
        fetch(`/listings/${i}`)
            .then((res) => res.json())
            .then((listing) => this.setState((prevState) => ({ listings: [ ...prevState.listings, listing ] })))
            .catch((err) => console.log(err));
        }
    }
    
    componentDidMount() {
        const { dispatch, userId } = this.props;
        dispatch(startSetListings(userId))
            .then(() => this.loadListings());
    }
    
    render() {
        const { listings } = this.state;
        return (
            <div className="page">
                <h1>Your existing listings</h1>
                <Link to="/host-form">
                    <button>Add a listing</button>
                </Link>
                <div className="listings-container">
                    {listings.map((listing) => (
                        <div key={listing._id}>
                            <h3>ID: {listing._id}</h3>
                            <h3>Description: {listing.description}</h3>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    listingIds: state.user.listings,
    userId: state.user._id
});

export default connect(mapStateToProps)(HostPage);