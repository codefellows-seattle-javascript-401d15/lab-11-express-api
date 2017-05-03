'use strict';

const http = require('http');
const Router = require('./lib/router');
const PORT = process.env.PORT || 8080;
const router = new Router();
const server = module.exports = http.createServer(router.route());
require('./routes/car-routes.js')(router);
server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
