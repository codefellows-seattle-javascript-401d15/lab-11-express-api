'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');
const DATA_URL = `${__dirname}/../data`;

module.exports = exports = {};

exports.createAlbum = function(schema, album) {
  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  if(!album) return Promise.reject(createError(400, 'Album required'));
  
  let jsonAlbum = JSON.stringify(album);
  return fs.writeFileProm(`${DATA_URL}/${schema}/${album.id}.json`, jsonAlbum)
  .then(() => album)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.fetchAlbum = function(schema, id) {
  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  if(!id) return Promise.reject(createError(400, 'ID required'));
  console.log('888888888');
  return fs.readFileProm(`${DATA_URL}/${schema}/${id}.json`)
  .then(data => data)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.updateAlbum = function(schema, album, id) {
  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  if(!album) return Promise.reject(createError(400, 'Album required'));
  console.log('album', album);
  
  return fs.readFileProm(`${DATA_URL}/${schema}/${id}.json`)
  .then(data => {
    let storage = JSON.parse(data.toString());
    storage.artist = album.artist || storage.artist;
    storage.title = album.title || storage.title;
    storage.year = album.year || storage.year;
    
    let jsonStorage = JSON.stringify(storage);
    
    return fs.writeFileProm(`${DATA_URL}/${schema}/${id}.json`, jsonStorage)
    .then(() => storage)
    .catch(err => Promise.reject(createError(500, err.message)));
  })
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.removeAlbum = function(schemaName, id) {
  if(!schemaName) return Promise.reject(createError(400, 'Schema required'));
  if(!id) return Promise.reject(createError(400, 'ID required'));
  
  return fs.unlinkProm(`${DATA_URL}/${schemaName}/${id}.json`)
  .then(data => data)
  .catch(err => Promise.reject(createError(500, err.message)));
};