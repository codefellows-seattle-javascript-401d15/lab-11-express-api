'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {Suffix: 'Prom'});
const createError = require ('http-errors');

const DATA_URL = `${__dirname}/../data`;

module.exports = exports = {};

exports.createItem = function(folder, item) {
  if(!folder) return Promise.reject(createError(400, 'folder required'));
  if(!item) return Promise.reject(createError(400, 'item required'));

  let jsonItem = JSON.stringify(item);

  return fs.writeFileProm(`${DATA_URL}/${folder}/${item.id}.json`, jsonItem)
  .then(() => item)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.fetchItem = function(folder, id) {
  if(!folder) return Promise.reject(createError(400, 'folder required'));
  if(!id) return Promise.reject(400, 'id required');

  return fs.readFileProm(`${DATA_URL}/${folder}/${id}.json`)
  .then(data => data)
  .catch(err => Promise.reject(createError(404, err.message)));
};

exports.updateItem = function(folder, id, item) {
  if(!folder) return Promise.reject(createError(400, 'folder required'));
  if(!id) return Promise.reject(createError(400, 'id required'));
  if(!item) return Promise.reject(createError(400, 'item required'));

  item.id = id;
  let jsonItem = JSON.stringify(item);

  return fs.writeFileProm(`${DATA_URL}/${folder}/${id}.json`, jsonItem)
  .then(() => item)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.deleteItem = function(folder, id) {
  if(!folder) return Promise.reject(createError(400, 'folder required'));
  if(!id) return Promise.reject(createError(400, 'id required'));

  return fs.unlinkFileProm(`${DATA_URL}/${folder}/${id}.json`)
  .then(() => 'success')
  .catch(err => Promise.reject(createError(404, err.message)));
};
