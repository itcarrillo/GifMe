const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('home');
});

router.get('/result', (req, res) => {
	res.render('result', req.body);
});

module.exports = {router: router};