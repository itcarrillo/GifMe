const apiKey = process.env.giphy_api_token;
const apiUrl = 'http://api.giphy.com';
const request = require('request');

function handler(req, res) {
	const query = req.body;
	const url = apiUrl + '/v1/gifs/search?' + query;
	const pictureUrl = res.body.url;
}

module.exports = {handler};