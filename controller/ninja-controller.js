'use strict';

const debug = require('debug')('http:storage');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix:'Prom'});
const createError = require('http-errors');

module.exports = exports = {};

const DATA_URL = `${__dirname}/../data`;

exports.createItem = function(schema, item) {
  debug('#createItem');
  if(!schema) return Promise.reject(createError(400,'Schema required'));
  if(!item) return Promise.reject(createError(400, 'Ninja Required'));

  let jsonNinja = JSON.stringify(item);
  return fs.writeFileProm(`${DATA_URL}/${schema}/${item.id}.json`, jsonNinja)
  .then(() => jsonNinja)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.fetchItem = function(schema, id) {
  debug('#fetchItem');
  if(!schema) return Promise.reject(createError(400,'Schema required'));
  if(!id) return Promise.reject(createError(400, 'ID Required'));

  return fs.readFileProm(`${DATA_URL}/${schema}/${id}.json`)
  .then(data => data)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.deleteItem = function(schema, id) {
  debug('#deleteItem');
  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  if(!id) return Promise.reject(createError(400, 'ID required'));
  return fs.unlinkProm(`${DATA_URL}/${schema}/${id}.json`)
  .then(() => {})
  .catch(err =>Promise.reject(createError(404, err.message)));
};

exports.putItem = function(schema, id, name, clan, weapons){
  debug('#putItem');
  if(!schema) return Promise.reject(createError(400, 'Schema Required'));
  if(!id) return Promise.reject(createError(400, 'ID required'));
  if(!name && !clan && !weapons) return Promise.reject(createError(400, 'Name, Clan and Weapons required'));

  return fs.readFileProm(`${DATA_URL}/${schema}/${id}json`)
  .then(data => {
    let item = JSON.parse(data.toString());
    item.name = name;
    item.clan = clan;
    item.weapons = weapons;

    item = JSON.stringify(item);
    fs.writeFileProm(`${DATA_URL}/${schema}/${id}.json`, item)
    .then(() => item)
    .catch(err => {
      return Promise.reject(createError(404, err.message));
    });
  });
};
