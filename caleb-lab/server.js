'use strict';

const express = require('express');
const morgan = require('morgan');
const jsonParser = require('body-parser').json();

const PORT = process.env.PORT || 3000;
const app = express();
const router = express.Router();

app.use(morgan('dev'));
app.use(jsonParser);
// app.use(cors);
//there are different plugins for morgan that will give us differently formatted output
require('./routes/note-routes.js')(router);
app.use(router);

app.listen(PORT, () => console.log(`Listening on port, http://localhost:${PORT}`));

module.exports = app; //not required here unless youre testing
