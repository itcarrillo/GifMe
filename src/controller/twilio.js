require('dotenv').config();
const apiSid = process.env.twilio_api_sid;
const apiToken = process.env.twilio_api_token;
const number = '+19177460378';
const client = require('twilio')(apiSid, apiToken);
const request = require('request');

function receivePicture(req, res) {
	//const img = req.body.MediaUrl0;
	const img = 'https://s3-external-1.amazonaws.com/media.twiliocdn.com/ACacc644d07caf2bd18d5a0d89b9e15699/17f059bcf0a6f657bb6891c1687eb7b1';
	console.log(img);
	console.log(req.body.From);
	
	const options = {
    	url: '/api/parseImageUrl',
    	method: 'POST',
    	form: {'url': img}
	}

	request(options, (err, response, body) => {
		if (err) {
			console.log(err);
			res.send(err);
		}
		else {
			console.log(JSON.parse(body).Response.name);
		}
	});


	//sendGif('https://media2.giphy.com/media/11gKLgWdd4fq92/200w_d.gif', req.body.From);
}


function sendGif(url, to) {
	parameters = {mediaUrl: url, from: number, to: to}
	client.messages.create(parameters).then(
		(message) => console.log(message.sid));
}

module.exports = {receivePicture, sendGif};