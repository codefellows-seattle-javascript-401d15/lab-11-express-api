'use strict';

const express = require('express');
const morgan = require('morgan');
const jsonParser = require('body-parser').json();

const app = express();
const PORT = process.env.PORT || 3000;
const autoRouter = require('./route/car-routes');

app.use(jsonParser);
app.use(morgan('dev'));

app.use(autoRouter);

app.listen(PORT, () => console.log(`listening on port, ${PORT}`));

module.exports = app;


// express = require('express')
// const morgan = require('morgan')
// const jsonParser = require('body-parser').json()
//
// const PORT = process.env.PORT || 3000
// const app = express()
// const router = express.Router()
//
// app.use(jsonParser);
// app.use(morgan('dev')) //tiny
//
// require('./routes/note-routes')(router)
// app.use(router)
//
// app.listen(PORT, () => console.log(`listening on port, ${PORT}`))
//
// module.exports = app //not required unless you're testing

//http POST :3000/api/note name=hello details=deets use quotes if you want to put spaces in name and details
