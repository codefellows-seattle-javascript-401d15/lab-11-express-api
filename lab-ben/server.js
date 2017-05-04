'use strict';

const express = require('express');
const morgan = require('morgan');
const jsonParser = require('body-parser').json();
const app = express();
const PORT = process.env.PORT || 3000;


const router = express.Router();

app.use(jsonParser);
app.use(morgan('dev'));

require('./routes/consoles-routes.js')(router);
app.use(router);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));

//Done here for proper testing
module.exports = app;
