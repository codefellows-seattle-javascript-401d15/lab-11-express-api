'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const PORT = process.env.PORT || 3000;
const app = express();
const debug = require('debug');
const router = express.Router();
const morgan = require('morgan');

app.use(jsonParser);
// app.use(function(err, req, res, next){
//   if(!err.status){
//     return res.status(500).send('server error');
//   } else {
//     res.status(err.status).send(err.message).end();
//     next();
//   }
// });

app.use(morgan('dev'));

require('./route/weapon-routes')(router);
app.use(router);

app.listen(PORT, () => {
  debug('#server');
  console.log(`SERVER IS UP AND RUNNING, ${PORT}`);

});

module.exports = app;
