const Clarifai = require('clarifai');

const request = require('request');
const validUrl = require('valid-url');

const app = new Clarifai.App({
	apiKey: process.env.clarifai_api_token
});

function getGreater(data) {

	var maxIterator, maxValue = 0;
	for (var i in data) {
		if(maxValue < data[i].value){
			maxValue = data[i].value;
			maxIterator = i;
		}
  	}
	return data[maxIterator];
}

function parseClarafaiObject(object) {
	return object.name;
}

exports.parseImageUrl = (req,res) => {
	if (!validUrl.isUri(req.body.url)) {
		res.render('result', {url: 'https://media.giphy.com/media/9J7tdYltWyXIY/giphy.gif'});
	}
	else {
		// predict the contents of an image by passing in a url
		app.models.predict('GifMe', req.body.url).then(
		function(response) {
		  // console.log(response);

			const emotion = parseClarafaiObject(getGreater(response.outputs[0].data.concepts));

			console.log("emotion " + emotion);
			var request = require('request');
			request.post({
				url: 'http://localhost:3000/api/giphy',
				form: {string: emotion}
			}, function(error, response, body){
			res.send(body);
		  });
		},
		function(err) {
			console.error(err);
			res.json({Error: err});
		});
	}
}


exports.parseImageUrlTwilio = (req,res) => {
  // predict the contents of an image by passing in a url
app.models.predict('GifMe', req.body.url).then(
function(response) {
  // console.log(response);
	const emotion = parseClarafaiObject(getGreater(response.outputs[0].data.concepts));
	console.log("emotion " + emotion);
	var request = require('request');
	request.post({
	url: 'http://localhost:3000/api/giphyUrl',
	form: {string: emotion}
	}, function(error, response, body){
	// console.log(body);
	res.send(body);
});

},  function(err) {
		console.error(err);
		res.json({Error: err});
	});
}

exports.parseImageBase64 = (req,res) => {
  // console.log("Over here");
  // console.log(req.body.base64);
    // predict the contents of an image by passing in a url
  app.models.predict('GifMe', {base64: req.body.base64}).then(
    function(response) {
      // console.log(response);
      const emotion = parseClarafaiObject(getGreater(response.outputs[0].data.concepts));
      console.log("emotion " + emotion);
      var request = require('request');
      request.post({
        url:     'http://localhost:3000/api/giphy',
        form:    { string: emotion }
      }, function(error, response, body){
        res.send(body);
      });
      // request.post('/api/giphy').form({string:emotion});

      // res.json({Response: emotion});
    },
    function(err) {
      console.error(err);
      res.json({Error: err});
    }
    );
}
