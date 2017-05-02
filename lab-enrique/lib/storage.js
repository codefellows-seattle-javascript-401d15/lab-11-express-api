'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const pathUrl = `${__dirname}/../data`;
const createError = require('http-errors');

module.exports = exports = {};

exports.createItem = function(schema, item) {

  if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!item) return Promise.reject(createError(400, 'doge required'));

  let jsonNote = JSON.stringify(item);
  return fs.writeFileProm(`${pathUrl}/${schema}/${item.id}.json`, jsonNote)
  .then(() => item)
  .catch(err => Promise.reject(createError(500,err.message)));
};

exports.fetchItem = function(schema, id) {
  if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!id) return Promise.reject(createError(400, 'id required'));

  return fs.readFileProm(`${pathUrl}/${schema}/${id}.json`)
  .then(data => data);
};

exports.deleteItem = function(schema, id) {

  if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!id) return Promise.reject(createError(400, 'id required'));

  return delete fs.readFileProm(`${pathUrl}/${schema}/${id}.json`)

  .then(data => data);
};

exports.updateItem = function(schema, id) {

  if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!id) return Promise.reject(createError(400, 'id required'));


};
