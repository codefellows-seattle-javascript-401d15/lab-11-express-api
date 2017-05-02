'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const mkdirp = require('mkdirp');
const del = require('del');

const storage = {};

module.exports = exports = {};

exports.createPokemon = function(schema, pokemon) {
  if(!schema) return Promise.reject(new Error('schema required'));
  if(!pokemon) return Promise.reject(new Error('pokemon required'));
  if(!storage[schema]) storage[schema] = {};
  storage[schema][pokemon.id] = pokemon;

  mkdirp(`./data/${schema}`, function(err) {
    if (err) console.error(err);
    fs.writeFileProm(`./data/${schema}/${pokemon.id}.json`, JSON.stringify(pokemon))
    .then(() => {
      console.log(JSON.stringify(pokemon));
    })
    .catch(console.error);
  });
  return Promise.resolve(pokemon);
};

exports.fetchPokemon = function(schema, id) {
  if (!schema) return Promise.reject(new Error('Schema required'));
  if (!id) return Promise.reject(new Error('Id required.'));

  return fs.statProm(`./data/${schema}/${id}.json`)
  .catch(err => {
    return Promise.reject(err);
  })
  .then(() => {
    return fs.readFileProm(`./data/pokemon/${id}.json`);
  })
  .then(data => {
    return Promise.resolve(JSON.parse(data.toString()));
  });
};

exports.updatePokemon = function(schema, id, newPoke) {
  if (!schema) return Promise.reject(new Error('Schema required'));
  if (!id) return Promise.reject(new Error('Id required.'));

  return fs.readFileProm(`./data/${schema}/${id}.json`, 'utf-8')
  .then(pokemon => {
    pokemon = JSON.parse(pokemon);
    if (newPoke.name) pokemon.name = newPoke.name;
    if (newPoke.type) pokemon.type = newPoke.type;
    fs.writeFileProm(`./data/${schema}/${id}.json`, JSON.stringify(pokemon))
    .then(console.log)
    .catch(console.error);
  })
  .catch(console.error);
};

exports.deletePokemon = function(schema, id) {
  if (!schema) return Promise.reject(new Error('Schema required'));
  if (!id) return Promise.reject(new Error('Id required.'));

  return fs.statProm(`./data/${schema}/${id}.json`)
  .catch(err => {
    return Promise.reject(err);
  })
  .then(() => {
    return del(`./data/${schema}/${id}.json`)
    .then(() => console.log('Pokemon deleted'));
  })
  .then(() => {
    return Promise.resolve();
  });
};
