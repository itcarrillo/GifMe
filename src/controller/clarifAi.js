const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: process.env.clarifai_api_token
});

exports.parseImage = (req,res) => {
  // predict the contents of an image by passing in a url
app.models.predict('GifMe', 'http://www.globalhealthandwealthonline.com/wp-content/uploads/2016/02/happy-person-2.jpg').then(
function(response) {
  console.log(response);
  res.json({Response: response});
},
function(err) {
  console.error(err);
  res.json({Error: err});
}
);
}
