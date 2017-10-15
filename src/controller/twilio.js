require('dotenv').config();
const apiSid = process.env.twilio_api_sid;
const apiToken = process.env.twilio_api_token;
const number = '+19177460378';
const client = require('twilio')(apiSid, apiToken);
const request = require('request');

function receivePicture(req, res) {
	const img = req.body.MediaUrl0;
	console.log(img);
	console.log(req.body.From);
	
	const options = {
    	url: 'http://localhost:3000/api/parseImageUrlTwilio',
    	method: 'POST',
    	form: {'url': img}
	}

	request(options, (err, response, body) => {
		if (err) {
			console.log(err);
			res.send(err);
		}
		else {
			const obj = JSON.parse(body);
			console.log(obj.url);
			console.log(obj.emotion);
			sendGif(obj.url, obj.emotion, req.body.From);
		}
	});
}

function sendGif(url, text, to) {
	console.log('Sending gif...');
	console.log(text);
	console.log(url);
	parameters = {mediaUrl: url, from: number, to: to, body: text};
	client.messages.create(parameters).then(
		(message) => console.log(message.sid));
}

module.exports = {receivePicture, sendGif};