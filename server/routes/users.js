const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/:userId', (req, res) => {
    const id = req.params.userId;
    User.findById(id)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).send(err));
}); 

module.exports = router;