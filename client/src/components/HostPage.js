import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class HostPage extends React.Component {
    loadListing = (listingId) => {
        
    }
    
    render() {
        const { listings } = this.props;
        return (
            <div className="page">
                <h1>Your existing listings</h1>
                <Link to="/host-form">
                    <button>Add a listing</button>
                </Link>
                <div className="listings-container">
                    {listings.map((listingId) => this.loadListing(listingId))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    listings: state.user.listings
});

export default connect(mapStateToProps)(HostPage);