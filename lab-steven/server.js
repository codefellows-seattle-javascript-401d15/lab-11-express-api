'use strict';

const http = require('http');
const Router = require('./lib/router');
const debug = require('debug')('#http:server');
const PORT = process.env.PORT || 3000;

debug('server');
const router = new Router();
const server = module.exports = http.createServer(router.route());

require('./route/routes')(router);

server.listen(PORT, () => console.log(`Server listening at PORT: ${PORT}`));
