'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');

module.exports = exports = {};

const DATA_URL = `${__dirname}/../data`;

exports.createItem = function(schema, planet) {
  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  if(!planet) return Promise.reject(createError(400, 'Planet required'));

  let jsonPlanet = JSON.stringify(planet);
  return fs.writeFileProm(`${DATA_URL}/${schema}/${planet.id}.json`, jsonPlanet)
    .then(() => planet)
    .catch(err => Promise.reject(createError(500, err.message)));
};

exports.fetchItem = function(schema, id) {
  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  if(!id) return Promise.reject(createError(400, 'id required'));

  return fs.readFileProm(`${DATA_URL}/${schema}/${id}.json`)
    .then(data => data)    
    .catch(err => Promise.reject(createError(500, err.message)));
};
