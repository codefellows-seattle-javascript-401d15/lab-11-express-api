'use strict';
// 5. express router to replace.

// require debug module function and call it.
const debug = require('debug')('http:router');
const parseJson = require('./parse-json');
const parseUrl = require('./parse-url');

const Router = module.exports = function() {
  debug('#Router');
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

Router.prototype.get = function(endpoint, callback) {
  debug('#GET');
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback) {
  debug('#POST');
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback) {
  debug('#PUT');
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback) {
  debug('#DELETE');
  this.routes.DELETE[endpoint] = callback;
};

// this function will be our callback to the server.
Router.prototype.route = function() {
  debug('#routes');
  // setup any request and response to be passed into this callback.
  return (req, res) => {
    // handing callbacks in as promises into an array.
    Promise.all([
      // hand callback into parse url and parse json.
      parseUrl(req),
      // resolve promises.
      parseJson(req),
    ])
    // wait for all promise transactions to be closed first.
    .then(() => {
      // routes, method, pathname in the request.
      if(typeof this.routes[req.method][req.url.pathname] === 'function') {
        this.routes[req.method][req.url.pathname](req, res);
        // because it's a function, we can call it.
        return;
      }
      // if that works, stop executing, otherwise show 404.
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('route not found');
      res.end();
    })
    // if we have an error, show 400, bad request.
    .catch(err => {
      console.error(err);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request');
      res.end();
    });
  };
};
