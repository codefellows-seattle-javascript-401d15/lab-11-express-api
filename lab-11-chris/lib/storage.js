'use strict';

const debug = require('debug')('http:storage');
const fs = require('fs');
const mkdirp = require('mkdirp');
// const path = require('./data/json-storage/')
const storage = {};

module.exports = exports = {};

exports.createItem = function(schema, item) {
  debug('createItem()');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!item) return Promise.reject(new Error('item required'));
  if(!storage[schema]) storage[schema] = {};

  storage[schema][item.id] = item;
  mkdirp('./data/json-storage', function(err) {
    debug('mkdirp()');
    if (err) console.error(err);
    fs.writeFile(`./data/json-storage/${item.id}.json`, (JSON.stringify(item)), function(err) {
      debug('writeFile()');
      if(err)console.error(err);
      console.log('saved item to file');
    });

  });

  return Promise.resolve(item);
};

exports.fetchItem = function(schema, id) {
  debug('fetchItem()');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let item = schemaName[id];
    if(!item) return reject(new Error('item not found'));

    resolve(item);
  });
};

exports.updateItem = function(schema, id, newSong) {
  debug('updateItem()');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let item = schemaName[id];
    if(!item) return reject(new Error('item not found'));

    if(newSong.title) item.title = newSong.title;
    if(newSong.artist) item.artist = newSong.artist;
    if(newSong.album) item.album = newSong.album;
    
    fs.writeFile(`./data/json-storage/${item.id}.json`, (JSON.stringify(item)), function(err) {
      debug('writeFile()');
      if(err)console.error(err);
      console.log('saved item to file');
    });

    resolve(item);
  });
};

exports.deleteItem = function(schema, id) {
  debug('deleteItem()');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let item = schemaName[id];
    if(!item) return reject(new Error('item not found'));

    delete storage[schema][id];

    resolve();
  });
};
