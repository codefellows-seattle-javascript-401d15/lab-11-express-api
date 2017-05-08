'use strict';

const del = require('del');
const Promise = require('bluebird');
const mkdirp = require('mkdirp-promise');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');

module.exports = exports = {};

const DATA_URL = `${__dirname}/../data`;

exports.createItem = function(schema, planet) {
  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  if(!planet || !planet.name || !planet.universe) return Promise.reject(createError(400, 'Planet with name and universe required'));

  return mkdirp(`${DATA_URL}/${schema}`)
    .then(() => {
      let jsonPlanet = JSON.stringify(planet);
      fs.writeFileProm(`${DATA_URL}/${schema}/${planet.id}.json`, jsonPlanet)
        .then(() => planet)
        .catch(err => Promise.reject(createError(500, err.message)));
    })
    .catch(err => err.message);
};

exports.fetchItem = function(schema, id) {
  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  if(!id) return Promise.reject(createError(400, 'id required'));

  return fs.readFileProm(`${DATA_URL}/${schema}/${id}.json`)
    .then(data => data)
    .catch(err => Promise.reject(createError(500, err.message)));
};

exports.updateItem = function(schema, id, planet){
  return new Promise((resolve,reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    return fs.readFileProm(`${DATA_URL}/${schema}/${id}.json`)
      .then(data => {

        let toUpdate = JSON.parse(data.toString());

        if(planet.name) toUpdate.name = planet.name;
        if(planet.universe) toUpdate.universe = planet.universe;

        let updated = JSON.stringify(toUpdate);
        fs.writeFileProm(`${DATA_URL}/${schema}/${id}.json`, updated);

        return resolve(toUpdate);
      })
      .catch(err => reject(err));

  });
};

exports.deleteItem = function(schema, id){
  return new Promise((resolve,reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    del([`${DATA_URL}/${schema}/${id}.json`]);

    resolve();
  });
};
