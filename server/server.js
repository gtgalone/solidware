const express = require('express');
const path = require('path');

const app = express();

const handleRender = require('./render/handleRender');

app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get(/^\/[api]\/*/, (req, res) => res.send('api router'));

app.get('*', (req, res) => handleRender(req, res));

app.listen(3000, () => console.log('app listening on port 3000'));
