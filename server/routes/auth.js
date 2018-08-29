const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const passport = require('passport');
require('../passport')(passport);
const User = require('../models/user');
require('../mongo').connect();
const secrets = require('../secrets');

router.post('/signup', (req, res) => {
    const { userName, password } = req.body;

    const user = new User({
        userName,
        password
    });

    user.save()
        .then(() => res.json(user))
        .catch((err) => res.status(500).send(err));
});

router.post('/login', (req, res) => {
    const { userName, password } = req.body;

    User.findOne({ userName })
        .then((user) => {
            if (!user) {
                res.status(500).send('User not found');
            } else {
                user.comparePassword(password, (err, isMatch) => {
                    if (isMatch && !err) {
                        const token = jwt.encode(user, secrets.secret);
                        res.json('JWT ' + token);
                    } else {
                        res.status(500).send('Authentication failed: Wrong password');
                    }
                });
            }
        })
        .catch((err) => res.status(500).send(err));
});

// Example of a protected route
router.get('/testing', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(`Welcome to private area, ${req.user.userName}`);
});

module.exports = router;
