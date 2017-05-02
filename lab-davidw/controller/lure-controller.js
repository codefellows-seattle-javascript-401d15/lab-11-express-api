'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');
const LURE_URL = `${__dirname}/../data`;

module.exports = exports = {};

exports.createItem = function(schema, lure) {
  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  if(!lure) return Promise.reject(createError(400, 'lure required'));

  let  jsonLure = JSON.stringify(lure);
  return fs.writeFileProm(`${LURE_URL}/${schema}/${lure.id}.json`, jsonLure)
  .then(() => lure)
  .catch(err => Promise.reject(createError(500, err.message)));

  // exports.fetchItem = function() {
  // };
};
