const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const init = require('./database/model/init.model');
const apiRouter = require('./router/api.router');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

mongoose.connect('mongodb://mongo:27017/test', { useMongoClient: true })
  .then(({ db: { databaseName } }) => console.log(`Connected to ${databaseName}`))
  .catch(err => console.error(err));

// init();

const handleRender = require('./render/handleRender');

app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.use('/api', apiRouter);

app.get('*', (req, res) => handleRender(req, res));

app.listen(3000, () => console.log('app listening on port 3000'));
