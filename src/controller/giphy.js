const apiKey = process.env.giphy_api_token;
const apiUrl = 'http://api.giphy.com';
const request = require('request');

function getGif(req, res) {
	let output;
	const query = req.body.string;
	console.log(query);
	const url = apiUrl + '/v1/gifs/search?q=' + query + '&api_key=' + apiKey + '&limit=1';
	request(url, (error, response, body) => {
		console.log(body);
		if (error) {
			console.log('Error');
			res.send(error);
		}
		else {
			output = JSON.parse(body).data[0].images.original.url;
			return output;
			//res.render('result', {url: output});
		}
	});
}

module.exports = {getGif};