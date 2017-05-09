'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const mkdirp = require('mkdirp-promise');
const del = require('del');

module.exports = exports = {};

exports.createCandy = function(schema, candy) {
  if(!schema) return Promise.reject(new Error('schema required'));
  if(!candy) return Promise.reject(new Error('candy required'));

  return mkdirp(`./data/${schema}`)
  .then(() => {
    return fs.writeFileProm(`./data/${schema}/${candy.id}.json`, JSON.stringify(candy))
    .then(() => {
      return JSON.stringify(candy);
    })
    .catch(err => {
      return err;
    });
  }
  exports.fetchCandy = function(schema, id) {
    if(!schema) return Promise.reject(new Error('Schema required'));
    if(!id) return Promise.reject(new Error('id rquired'));

    return fs.statProm(`./data/${schema}/${id}.json`)
    .catch(err => {
      return Promise.reject(err);
    })
    .then(data => {
      return Promise.resolve(JSON.parse(data.toString()));
    });
  }

  exports.updateCandy = function(schema, id, newCandy) {
    if (!schema) return Promise.reject(new Error('schema required'));
    if (!id) return Promise.reject(new Error('id required'));

    return fs.readFileProm(`./data/${schema}/${id}.json`, 'utf-8')
    .then(candy => {
      candy = JSON.parse(candy);
      if (newCandy.name) candy.name = newCandy.name;
      if (newCandy.type) candy.type = newCandy.type;
      if (newCandy.texture) candy.texure = newCandy.texture;
      fs.writeFileProm(`./data/${schema}/${id}.json`, JSON.stringify(candy))
      .then(console.log)
      .catch(console.error);
    })
    .catch(console.error);
  };

  exports.removeCandy = function(schema, id) {
    if (!schema) return Promise.reject(new Error('schema required'));
    if (!id) return Promise.reject(new Error('id required'));

    return fs.statProm(`./data/${schema}/${id}.json`)
    .catch(err => {
      return Promise.reject(err);
    })
    .then(() => {
      return del(`./data/${schema}/${id}.json`)
      .then(() => console.log('candy deleted'));
    })
    .then(() => {
      return Promise.resolve();
    });
  };
};
