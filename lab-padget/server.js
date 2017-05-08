'use strict';
// 6. server.

const http = require('http');
const Router = require('./lib/router');
// eslint-disable-next-line
const storage = require('./lib/storage');
// eslint-disable-next-line
const Music = require('./model/music');
// eslint-disable-next-line
const debug = require('debug')('http:server');
// eslint-disable-next-line
const PORT = process.env.PORT || 3000;

// callback to start server, alias exports to server.
const router = new Router();
// bind to the router so we have the routes, call, return callback.
const server = module.exports = http.createServer(router.route());

require('./routes/music-router.js')(router);

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
