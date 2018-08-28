const mongoose = require('mongoose');
const secrets = require('./secrets');

mongoose.Promise = global.Promise;

const username = secrets.mongoUser;
const password = secrets.mongoPass;
const mongoUri = `mongodb://${username}:${password}@ds018568.mlab.com:18568/cookout`;

const connect = () => {
    return mongoose.connect(mongoUri);
};

module.exports = {
    connect,
    mongoose
};