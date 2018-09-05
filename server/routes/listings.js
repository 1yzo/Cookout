const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');
const User = require('../models/user');

router.post('/', (req, res) => {
    const details = req.body;
    const listing = new Listing({ ...details });
    listing.save()
        .then(() => res.json(listing))
        .then(() => {
            User.findById(details.host)
                .then((user) => { 
                    user.listings = user.listings.concat(listing._id);
                    user.save().catch((err) => res.status(500).send(err));
                 })
                 .catch((err) => res.status(500).send(err));
        })
        .catch((err) => res.status(500).send(err));
});

router.get('/', (req, res) => {
    Listing.find()
        .then((listings) => res.json(listings))
        .catch((err) => res.status(500).send(err));
});

router.get('/:listingId', (req, res) => {
    const id = req.params.listingId;
    Listing.findById(id)
        .then((listing) => res.json(listing))
        .catch(err => res.status(500).send(500));
});

module.exports = router;