require('dotenv').config();
const apiSid = process.env.twilio_api_sid;
const apiToken = process.env.twilio_api_token;
const number = '+19177460378';
const client = require('twilio')(apiSid, apiToken);
const request = require('request');
const clariAi = require('./clariAi.js');

function receivePicture(req, res) {
	const img = req.body.Body;
	console.log(img);
	//clariAi.parseImageBase64(img)
	console.log(req.body.From);
	//sendGif('https://media2.giphy.com/media/11gKLgWdd4fq92/200w_d.gif', req.body.From);
}


function sendGif(url, to) {
	parameters = {mediaUrl: url, from: number, to: to}
	client.messages.create(parameters).then(
		(message) => console.log(message.sid));
}

module.exports = {receivePicture, sendGif};