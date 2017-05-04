'use strict';

const createError = require('http-errors');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const mkdirp = require('mkdirp-promise');
const del = require('del');

module.exports = exports = {};

const DATA_URL = `${__dirname}/../data`;

exports.createPokemon = function(schema, pokemon) {
  if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!pokemon) return Promise.reject(createError(400, 'pokemon required'));
  if (!pokemon.name || !pokemon.type) return Promise.reject(createError(400, 'invalid inputs'));

  return mkdirp(`${DATA_URL}/${schema}`)
  .then(() => {
    let jsonPokemon = JSON.stringify(pokemon);
    fs.writeFileProm(`${DATA_URL}/${schema}/${pokemon.id}.json`, jsonPokemon)
    .then(() => pokemon)
    .catch(err => Promise.reject(createError(500, err.message)));
  })
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.fetchPokemon = function(schema, id) {
  if (!schema) return Promise.reject(createError(400, 'Schema required'));
  if (!id) return Promise.reject(createError(400, 'Id required.'));

  return fs.readFileProm(`${DATA_URL}/${schema}/${id}.json`)
  .then(data => data)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.updatePokemon = function(schema, id, newPoke) {
  if (!schema) return Promise.reject(createError(400, 'Schema required'));
  if (!id) return Promise.reject(createError(400, 'Id required.'));
  if (!newPoke.name && !newPoke.type) return Promise.reject(createError(404, 'invalid inputs'));

  return fs.readFileProm(`${DATA_URL}/${schema}/${id}.json`)
  .then(pokemon => {
    pokemon = JSON.parse(pokemon.toString());
    if (newPoke.name) pokemon.name = newPoke.name;
    if (newPoke.type) pokemon.type = newPoke.type;
    fs.writeFileProm(`${DATA_URL}/${schema}/${id}.json`, JSON.stringify(pokemon))
    .then(() => pokemon)
    .catch(err => Promise.reject(createError(500, err.message)));
  })
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.deletePokemon = function(schema, id) {
  if (!schema) return Promise.reject(createError(400, 'Schema required'));
  if (!id) return Promise.reject(createError(400, 'Id required.'));

  return fs.readFileProm(`${DATA_URL}/${schema}/${id}.json`)
  .then(() => del(`${DATA_URL}/${schema}/${id}.json`))
  .catch(err => Promise.reject(createError(404, err.message)));
};
