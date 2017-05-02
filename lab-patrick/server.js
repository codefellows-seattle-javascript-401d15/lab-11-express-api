'use strict';

const morgan = require('morgan');
const express = require('express');
const carRouter = require('./routes/car-routes');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use(carRouter);

app.listen(PORT, () => console.log(`Listening on port, ${PORT}`));

module.exports = app;
