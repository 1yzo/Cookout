const mongoose = require('mongoose');
const Schema = mongoose.Scheme;

listingSchema = new Schema({
    host: String,
    badges: [ String ],
    image: String,
    address: String,
    location: { lat: Number, lng: Number },
    price: Number, 
    occupancy: Number,
    subImages: [ String ],
    bookedSlots: [ { day: String, begin: String, end: String } ]
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;