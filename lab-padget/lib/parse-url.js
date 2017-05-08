'use strict';
// 3. parse url.

// require debug module function and call it.
const debug = require('debug')('http:parse-url');
// bind parse method to variable.
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;

module.exports = function(req) {
  debug('#parse-url');
  // created url object with protocol and host.
  req.url = parseUrl(req.url);
  // gets query, property, string.
  req.url.query = parseQuery(req.url.query);
  // an explicit resolve, assign key value to req.
  return Promise.resolve(req);
};
