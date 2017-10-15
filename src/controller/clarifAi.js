const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: process.env.clarifai_api_token
});

function getGreater(data){
  console.log(data);
  var maxIterator, maxValue = 0;
  for (var i in data) {
    if(maxValue < data[i].value){
      maxValue = data[i].value;
      maxIterator = i;
    }
  }
  return data[maxIterator];
}

exports.parseImageUrl = (req,res) => {
  // predict the contents of an image by passing in a url
app.models.predict('GifMe', req.body.url).then(
function(response) {
  console.log(response);
  res.json({Response: getGreater(response.outputs[0].data.concepts)});
},
function(err) {
  console.error(err);
  res.json({Error: err});
}
);
}

exports.parseImageBase64 = (req,res) => {
  // predict the contents of an image by passing in a url
app.models.predict('GifMe', {base64: req.body.url}).then(
function(response) {
  console.log(response);
  res.json({Response: getGreater(response.outputs[0].data.concepts)});
},
function(err) {
  console.error(err);
  res.json({Error: err});
}
);
}
