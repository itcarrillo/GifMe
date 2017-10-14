const express = require('express');
const app = express();
const path = require('path');
app.set('view engine', 'hbs');
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

const apiRouter = require('./routes/api.js');
const viewsRouter = require('./routes/views.js');

//app.use('apiRouter');
app.use(viewsRouter.router);
app.use('/api', apiRouter);

app.listen(3000);
