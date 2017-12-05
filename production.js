const express = require('express');
const path = require('path');
const app = express();

const ClientStatsPath = path.join(__dirname, './dist/stats.json');
const ServerRendererPath = path.join(__dirname, './dist/server.js');
const ServerRenderer = require(ServerRendererPath).default;
const Stats = require(ClientStatsPath);

app.use(ServerRenderer(Stats));

app.listen(3000, () => console.log('app listening on port 3000'));
