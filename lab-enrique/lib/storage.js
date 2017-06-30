'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const pathUrl = `${__dirname}/../data`;
const createError = require('http-errors');
const del = require('del');

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
  if (!schema) return Promise.reject(new Error('schema required'));
  if (!id) return Promise.reject(new Error('id required'));

  return fs.statProm(`./data/${schema}/${id}.json`)
 .catch(err => {
   return Promise.reject(err);
 })
 .then(() => {
   return del(`./data/${schema}/${id}.json`)
   .then(() => console.log('doge deleted'));
 })
 .then(() => {
   return Promise.resolve();
 });
};
exports.updateItem = function(schema, doge) {
  if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!doge) return Promise.reject(createError(400, 'id required'));

  return fs.readFileProm(`${pathUrl}/${schema}/${doge.id}.json`)
  .then(data => {
    let storage = JSON.parse(data.toString());
    storage.name = doge.name || storage.name;
    storage.type = doge.type || storage.type;
    storage.color = doge.color || storage.color;
    let jsonStorage = JSON.stringify(storage);
    return fs.readFileProm(`${pathUrl}/${schema}/${doge.id}.json`, jsonStorage)
    .then(() => storage)
    .catch(err => Promise.reject(createError(500, err.message)));
  })
  .catch(err => Promise.reject(createError(500, err.message)));

};
