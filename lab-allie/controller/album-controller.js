'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs', {suffix: 'Prom'}));
const createError = require('http-errors');
const DATA_URL = `${__dirname}/../data`;
const storage = {};

module.exports = exports = {};

exports.createAlbum = function(schema, album) {
  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  if(!album) return Promise.reject(createError(40, 'Note required'));
  
  let jsonAlbum = JSON.stringify(album);
  fs.writeFileProm(`${DATA_URL}/${schema}/${album.id}.json`, jsonAlbum)
  .then(() => album)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.fetchAlbum = function(schema, id) {
  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  if(!id) return Promise.reject(createError(400, 'ID required'));
  
  return fs.readFileProm(`${DATA_URL}/${schema}/${id}.json`)
  .then(data => data)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.updateAlbum = function(schemaName, album) {
  if(!schemaName) return (new Error('Schema required'));
  if(!album) return (new Error('Album required'));
  
  let schema = storage[schemaName];
  if(!schema) return (new Error('Schema does not exist'));
  
  if(!schema[album.id]) return (new Error('Album does not exist'));
  // fs.readFileProm(`${DATA_URL}/${schema}/${id}.json`)
  // .then(
    
  fs.writeFileProm(`${DATA_URL}/${schema}/${album.id}.json`)
  .then(() => album)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.removeAlbum = function(schemaName, id) {
  if(!schemaName) return Promise.reject(createError(400, 'Schema required'));
  if(!id) return Promise.reject(createError(400, 'ID required'));
  
  return fs.unlinkProm(`${DATA_URL}/${schemaName}/${id}.json`)
  .then(data => data)
  .catch(err => Promise.reject(createError(500, err.message)));
};