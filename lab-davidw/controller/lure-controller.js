'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');

module.exports = exports = {};

const DATA_URL = `${__dirname}/../data`;

exports.createItem = function(schema, lure) {
  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  if(!lure) return Promise.reject(createError(400, 'lure required'));

  let  jsonLure = JSON.stringify(lure);
  return fs.writeFileProm(`${DATA_URL}/${schema}/${lure.id}.json`, jsonLure)
  .then(() => lure)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.fetchItem = function(schema, id) {
  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  if(!id) return Promise.reject(createError(400, 'Id required'));

  return fs.readFileProm(`${DATA_URL}/${schema}/${id}.json`)
    .then(data => data)
    .catch(err => Promise.reject(createError(500, err.message)));
};

exports.fetchLureIDs = function() {
  return fs.readFileProm(`${DATA_URL}/lure/*.json`)
  .then(data => data)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.updateItem = function(schema, lure) {

  if(!schema) return Promise.reject(createError(412, 'Schema to be updated required'));
  if(!lure) return Promise.reject(createError(412, 'lure to be updated required'));

  return fs.readFileProm(`${DATA_URL}/${schema}/${lure.id}.json`)
  .then(data => {
    let  storage = JSON.parse(data.toString());
    storage.name = lure.name || storage.name;
    storage.type = lure.type || storage.type;
    storage.targets = lure.targets || storage.targets;
    storage.water = lure.water || storage.water;

    let jsonStorage = JSON.stringify(storage);

    return fs.writeFileProm(`${DATA_URL}/${schema}/${lure.id}.json`, jsonStorage)
    .then(() => storage)
    .catch(err => Promise.reject(createError(500, err.message)));
  })
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.deleteItem = function(schema, id) {
  if(!schema) return Promise.reject(new Error(400, 'schema required'));
  if(!id) return Promise.reject(new Error(400, 'Id required'));

  return fs.unlinkProm(`${DATA_URL}/../data/${schema}/${id}.json`)
  .then(() => {
    console.log(`${schema}, ${id}, has been deleted.`);
  })
  .catch(err => Promise.reject(new Error(404, err.message)));
};
