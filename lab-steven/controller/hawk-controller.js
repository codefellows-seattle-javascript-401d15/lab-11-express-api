'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');

module.exports = exports = {};

exports.createHawk = function(schema, hawk){

  if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!hawk) return Promise.reject(createError(400, 'hawk required'));

  return fs.writeFileProm(`${__dirname}/../data/${schema}/${hawk.id}.json`, JSON.stringify(hawk))
    .then(() => Promise.resolve(hawk))
    .catch(err => Promise.reject(createError(500, err.message)));
};

exports.fetchHawk = function(schema, id){

  if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!id) return Promise.reject(createError(400, 'id required'));

  return fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`)
    .then(hawk => Promise.resolve(JSON.parse(hawk.toString())))
    .catch(err => Promise.reject(createError(404, err.message)));
};

exports.updateHawk = function(schema, id, hawkChanges){

  if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!id) return Promise.reject(createError(400, 'id required'));
  if(!hawkChanges) return Promise.reject(createError(400, 'schema required'));

  return fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`)
    .then(hawk => {
      let hawkup = JSON.parse(hawk.toString());
      if(hawkChanges.name) hawkup.name = hawkChanges.name;
      if(hawkChanges.pos) hawkup.pos = hawkChanges.pos;
      if(hawkChanges.round) hawkup.round = hawkChanges.round;
      return fs.writeFileProm(`${__dirname}/../data/${schema}/${id}.json`, JSON.stringify(hawkup))
        .then(() => Promise.resolve(hawkup))
        .catch(err => Promise.reject(createError(500, err.message)));
    }).catch(err => Promise.reject(createError(500, err.message)));
};

exports.deleteHawk = function(schema, id){

  if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!id) return Promise.reject(createError(400, 'id required'));

  return fs.unlinkProm(`${__dirname}/../data/${schema}/${id}.json`)
    .then(data => Promise.resolve(data))
    .catch(err => Promise.reject(createError(500, err.message)));
};
