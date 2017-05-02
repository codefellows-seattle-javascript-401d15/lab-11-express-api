'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const PORT = process.env.PORT || 3000;
const app = express();
const debug = require('debug');
const router = express.Router();

app.use(jsonParser);

require('./route/weapon-routes')(router);
app.use(router);

app.listen(PORT, () => {
  debug('#server');
  console.log(`SERVER IS UP AND RUNNING, ${PORT}`);

});

module.exports = app;
