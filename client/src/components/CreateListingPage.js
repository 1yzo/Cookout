import React from 'react';
import ListingForm from './ListingForm';

const CreateListingPage = () => (
    <div className="page">
        <ListingForm
            handleSubmit={(body) => {
                return new Promise((resolve, reject) => {
                    fetch('/listings', {
                        method: 'POST',
                        body
                    })
                        .then(() => { resolve() })
                        .catch((err) => { reject(err) });
                });
            }}
         />
    </div>

);

export default CreateListingPage;