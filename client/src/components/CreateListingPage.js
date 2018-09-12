import React from 'react';
import ListingForm from './ListingForm';

const CreateListingPage = (props) => (
    <div className="page">
        <ListingForm
            history={props.history}
            handleSubmit={(body) => {
                return new Promise((resolve, reject) => {
                    fetch('/listings', {
                        method: 'POST',
                        body
                    })
                        .then((res) => { resolve(res) })
                        .catch((err) => { reject(err) });
                });
            }}
         />
    </div>

);

export default CreateListingPage;