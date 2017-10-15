const apiKey = process.env.giphy_api_token;
const apiUrl = 'http://api.giphy.com';
const request = require('request');

function getGif(req, res) {
	let output;
	const query = req.body.string;
	const url = apiUrl + '/v1/gifs/search?q=' + query + '&api_key=' + apiKey + '&limit=30';
	request(url, (error, response, body) => {
		if (error) {
			console.log('Error');
			res.send(error);
		}
		else {
			const rando = parseInt(Math.random() * 30);
			output = JSON.parse(body).data[rando].images.original.url;
			res.render('result', {url: output});
		}
	});
}

module.exports = {getGif};