const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');

router.post('/', (req, res) => {
    const details = req.body;
    console.log(details)
    const listing = new Listing({ ...details });
    listing.save()
        .then(() => res.json(listing))
        .catch((err) => res.status(500).send(err));
});

module.exports = router;