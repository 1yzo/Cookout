import React from 'react';
import ListingForm from './ListingForm';

const CreateListingPage = (props) => (
    <div className="page">
        <ListingForm
            history={props.history}
            handleSubmit={(body) => {
                return fetch('/listings', {
                    method: 'POST',
                    body
                });   
            }}
         />
    </div>

);

export default CreateListingPage;