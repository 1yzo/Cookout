const mongoose = require('mongoose');
const Schema = mongoose.Schema;

listingSchema = new Schema({
    host: String,
    badges: [ String ],
    image: String,
    address: String,
    location: { lat: Number, lng: Number },
    price: Number, 
    occupancy: Number,
    subImages: [ String ],
    bookedSlots: [ { day: String, begin: Number, end: Number } ],
    hours: { open: Number, close: Number }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;