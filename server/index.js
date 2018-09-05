const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// Routers
const auth = require('./routes/auth');
const listings = require('./routes/listings');
const users = require('./routes/users');

const app = express();

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use('/auth', auth);
app.use('/listings', listings);
app.use('/users', users);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../client/build/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`server listening on ${port}`);
