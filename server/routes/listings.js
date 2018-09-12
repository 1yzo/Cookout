const express = require('express');
const router = express.Router();
const uuid = require('uuid/v4');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const Listing = require('../models/listing');
const User = require('../models/user');
const awsSecret = require('../secrets').aws;

const config = {
    accessKeyId: awsSecret.accessKeyId, secretAccessKey: awsSecret.secretAccessKey, region: awsSecret.region
};
AWS.config.update(config);
const s3 = new AWS.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'cookout-images',
        key: function (req, file, cb) {
            cb(null, `${uuid()}.jpg`);
        }
    })
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

router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'subImages[]', maxCount: 10 }]), (req, res) => {
    const details = req.body;
    const image = req.files['image'][0];
    const subImages = req.files['subImages[]'];
    const listing = new Listing({ 
        ...details,
        location: JSON.parse(details.location),
        badges: JSON.parse(details.badges),
        hours: JSON.parse(details.hours),
        image: image.location,
        subImages: subImages ? subImages.map((image) => image.location) : []
    });
    listing.save()
        .then(() => res.json(listing))
        .then(() => User.findById(details.host))
        .then((user) => { 
            user.listings = user.listings.concat(listing._id);
            return user.save();
        })
        .catch((err) => res.status(500).send(err));
});

router.put('/:listingId', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'subImages[]', maxCount: 10 }]), (req, res) => {
    const details = req.body;
    const image = req.files['image'][0];
    const subImages = req.files['subImages[]'];
    const s3ObjectKeysToDelete = JSON.parse(details.s3ObjectKeysToDelete);
    if (s3ObjectKeysToDelete.length > 0) {
        const params = {
            Bucket: 'cookout-images',
            Delete: {
                Objects: s3ObjectKeysToDelete.map((objectKey) => ({ Key: objectKey }))
            }
        };
        console.log(params);
        s3.deleteObjects(params, (err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                Listing.findByIdAndUpdate(req.params.listingId, { 
                    ...details,
                    location: JSON.parse(details.location),
                    badges: JSON.parse(details.badges),
                    hours: JSON.parse(details.hours),
                    image: image.location,
                    subImages: subImages ? subImages.map((image) => image.location) : []
                })
                    .then(() => { res.json('success') })
                    .catch(err => res.status(500).send(err));
            }
        })
    } else {
        Listing.findByIdAndUpdate(req.params.listingId, { 
            ...details,
            location: JSON.parse(details.location),
            badges: JSON.parse(details.badges),
            hours: JSON.parse(details.hours),
            image: image.location,
            subImages: subImages ? subImages.map((image) => image.location) : []
        })
            .then(() => { res.json('success') })
            .catch(err => res.status(500).send(err));
    }
});

module.exports = router;