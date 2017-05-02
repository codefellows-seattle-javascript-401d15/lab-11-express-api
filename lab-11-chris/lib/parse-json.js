'use strict';

const debug = require('debug')('http:parser-json');
// const Promise = require('bluebird');
// const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
module.exports = function(req) {
  return new Promise((resolve, reject) => {
    debug('parser-json()');

    if(req.method === 'POST' || req.method === 'PUT') {
      let body = '';

      req.on('data', data => body += data.toString());
      req.on('end', () => {
        try {
          req.body = JSON.parse(body);
          resolve(req);
        } catch(e) {
          console.error(e);
          reject(e);
        }
      });

      req.on('error', err => {
        console.error(err);
        reject(err);
      });
      return;
    }
    resolve();
  });
};
