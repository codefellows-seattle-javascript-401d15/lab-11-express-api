'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const mkdirp = require('mkdirp');
// const del = require('del');

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
  return new Promise((resolve, reject) => {
    // debug('#fetchPokemon');
    if (!schema) return reject(new Error('Schema required'));
    if (!id) return reject(new Error('Id required.'));

    let schemaName = storage[schema];
    if (!schemaName) return reject(new Error('Schema not found'));

    let pokemon = schemaName[id];
    if (!pokemon) return reject(new Error('Pokemon not found'));

    resolve(pokemon);
  });
};

exports.updatePokemon = function(schema, id, newPoke) {
  return new Promise((resolve, reject) => {
    // debug('#updatePokemon');
    if (!schema) return reject(new Error('Schema required'));
    if (!id) return reject(new Error('Id required.'));

    let schemaName = storage[schema];
    if (!schemaName) return reject(new Error('Schema not found'));

    let pokemon = schemaName[id];
    if (!pokemon) return reject(new Error('Pokemon not found'));

    if (newPoke.name) pokemon.name = newPoke.name;
    if (newPoke.type) pokemon.type = newPoke.type;

    resolve(pokemon);
  });
};

exports.deletePokemon = function(schema, id) {
  return new Promise((resolve, reject) => {
    // debug('#deletePokemon');
    if (!schema) return reject(new Error('Schema required'));
    if (!id) return reject(new Error('Id required.'));

    let schemaName = storage[schema];
    if (!schemaName) return reject(new Error('Schema not found'));

    let pokemon = schemaName[id];
    if (!pokemon) return reject(new Error('Pokemon not found'));

    delete storage[schema][id];

    resolve();
  });
};
