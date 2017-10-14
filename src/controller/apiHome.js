exports.getApi = (req, res) => {
  res.status(200);
  res.json({message : "Welcome to the GifMe Api"});
};

exports.postApi = (req,res,next) => {

  res.status(403);
  res.json({message : "Gifme Does not allow Post to this route"});
};
