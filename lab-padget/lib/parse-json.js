'use strict';
// 2. parse json.

// require debug module function and call it.
const debug = require('debug')('http:parser-json');

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    debug('#parser-json'); // log:module name.

    if(req.method === 'POST' || req.method === 'PUT') {
      let body = '';
      // promise.
      req.on('data', data => body += data.toString());
      // when the error occurs in parsing process.
      req.on('end', () => {
        try {
          // try resolving the body parser.
          req.body = JSON.parse(body);
          resolve(req);
        } catch(e) {
          // if error, reject error.
          console.error(e);
          reject(e);
        }
      });
      // an error occurred during the data stream.
      req.on('error', err => {
        console.error(err);
        reject(err);
      });
      // return success or failure.
      return;
    }
    // return above, don't resolve.
    resolve();
  });
};
