const apiKey = process.env.giphy_api_token;
const apiUrl = 'http://api.giphy.com';
const request = require('request');

function getGifRendered(req, res) {
	console.log("Test");
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

function getGifUrl(req, res) {
	console.log("Test Url");
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
			output = JSON.parse(body).data[rando].images.downsized.url;
			console.log(output);
			res.send({url: output, emotion: query});
		}
	});
}
module.exports = {getGifRendered, getGifUrl};
