import React from 'react';

const ViewListingPage = (props) => (
    <div className="page">
        <h1>Viewing {props.match.params.listingId}</h1>
    </div>
);

export default ViewListingPage;