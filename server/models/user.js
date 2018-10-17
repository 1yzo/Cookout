const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: String,
    bookings: [ String ],
    saved: [ String ],
    listings: [ String ]
});

userSchema.pre('save', function(next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        })
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User;