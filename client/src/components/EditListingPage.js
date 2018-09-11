import React from 'react';
import ListingForm from './ListingForm';

class EditListingPage extends React.Component {
    state = {
        listingId: this.props.match.params.listingId,
        listing: undefined
    };

    componentDidMount() {
        fetch(`/listings/${this.state.listingId}`)
            .then(res => res.json())
            .then(res => { this.setState(() => ({ listing: res })) })
            .catch(err => { console.log(err) });
    }
    
    render() {
        const { listingId, listing } = this.state;
        return (
            <div className="page">
                {listing &&
                <ListingForm 
                    listing={listing}
                    handleSubmit={(body) => {
                        return new Promise((resolve, reject) => {
                            fetch(`/listings/${listingId}`, {
                                method: 'PUT',
                                body
                            })
                                .then(() => { resolve() })
                                .catch((err) => { reject(err) });
                        });
                    }}
                />
                }
            </div>
        );
    }
}


export default EditListingPage;