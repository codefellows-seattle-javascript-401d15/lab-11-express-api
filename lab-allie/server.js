'use strict';

const express = require('express');
const morgan = require('morgan');
const jsonParser = require('body-parser').json();

const PORT = process.env.PORT || 3000;
const app = express();
const router = express.Router();

app.use(jsonParser);
app.use(morgan('dev'));
app.use(router);

require('./routes/album-routes.js')(router);


app.listen(PORT, () => console.log(`Listening on port, ${PORT}`));

module.exports = app;