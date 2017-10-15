/*jshint esversion: 6 */

// Dependencies
const express = require('express');
const router = express.Router();

const apiHome = require('../controller/apiHome');
const clarifAi = require('../controller/clarifAi');

const giphy = require('../controller/giphy');
const twilio = require('../controller/twilio');
// API
router.get('/', apiHome.getApi);
router.post('/', apiHome.postApi);

router.post('/parseImageUrl', clarifAi.parseImageUrl);
router.post('/parseImageUrlTwilio', clarifAi.parseImageUrlTwilio);
router.post('/parseImageBase64', clarifAi.parseImageBase64);

router.post('/giphy', giphy.getGifRendered);
router.post('/giphyUrl', giphy.getGifUrl);
router.post('/twilio', twilio.receivePicture);

// Return Router
module.exports = router;
