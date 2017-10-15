const express = require('express');
const app = express();
var bodyParser = require('body-parser');
require('dotenv').config();

const path = require('path');
app.set('view engine', 'hbs');
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// Configure app to use bodyParser()
// This will let us get data from a POST
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({extended:true, limit: '10mb'}));
app.use(bodyParser.json());


const apiRouter = require('./routes/api.js');
const viewsRouter = require('./routes/views.js');

//app.use('apiRouter');
app.use(viewsRouter.router);
app.use('/api', apiRouter);

app.listen(3000);

console.log("Server Started");
