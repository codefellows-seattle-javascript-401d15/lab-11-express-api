'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');

const DATA_URL = `${__dirname}/../data`;

module.exports = exports = {};

exports.createItem = function(schema, item) {
  if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!item) return Promise.reject(createError(400, 'item required'));

  let jsonItem = JSON.stringify(item);

  return fs.writeFileProm(`${DATA_URL}/${schema}/${item.id}.json`, jsonItem)
  .then(() => item)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.fetchItem = function(schema, id) {
  if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!id) return Promise.reject(400, 'id required');

  return fs.readFileProm(`${DATA_URL}/${schema}/${id}.json`)
  .then(data => data)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.updateItem = function(schema, id, item) {
  if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!id) return Promise.reject(createError(400, 'id required'));
  if(!item) return Promise.reject(createError(400, 'item required'));

  item.id = id;
  let jsonItem = JSON.stringify(item);

  return fs.writeFileProm(`${DATA_URL}/${schema}/${id}.json`, jsonItem)
  .then(() => item)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.deleteItem = function(schema, id) {
  if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!id) return Promise.reject(createError(400, 'id required'));

  return fs.unlinkProm(`${DATA_URL}/${schema}/${id}.json`)
  .then(() => 'success')
  .catch(err => Promise.reject(createError(404, err.message)));
};
