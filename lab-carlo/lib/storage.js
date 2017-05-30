'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');

module.exports = exports = {};

const DATA_URL = `${__dirname}/../data`;

exports.createCar = function(schemaName, auto) {
  if(!schemaName) return Promise.reject(createError(400, 'SchemaName required'));
  if(!auto) return Promise.reject(createError(400, 'auto required'));

  let jsonNote = JSON.stringify(auto);
  return fs.writeFileProm(`${DATA_URL}/${schemaName}/${auto.id}.json`, jsonNote)
  .then(() => auto)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.fetchCar = function(schemaName, id) {

  if(!schemaName) return Promise.reject(createError(400, 'SchemaName required'));
  if(!id) return Promise.reject(createError(400, 'ID required'));

  return fs.readFileProm(`${DATA_URL}/${schemaName}/${id}.json`)
  .then(data => data)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.fetchDelete = function(schemaName, id){

  if(!schemaName) return Promise.reject(createError(400, 'SchemaName required'));
  if(!id) return Promise.reject(createError(400, 'ID required'));

  return fs.unlinkProm(`${DATA_URL}/${schemaName}/${id}.json`)
  .catch(err => Promise.reject(createError(400, err.message)));
};

exports.fetchPut = function(schemaName, auto) {
  if(!schemaName) return Promise.reject(createError(400, 'SchemaName required'));
  if(!auto) return Promise.reject(createError(400, 'auto required'));

  return fs.readFileProm(`${DATA_URL}/${schemaName}/${auto.id}.json`)
  .then(data => {
    let storage = JSON.parse(data.toString());
    storage.make = auto.make || storage.make;
    storage.model = auto.model || storage.model;

    let jsonStorage = JSON.stringify(storage);

    return fs.writeFileProm(`${DATA_URL}/${schemaName}/${auto.id}.json`, jsonStorage)
    .then(() => storage)
    .catch(err => Promise.reject(createError(500, err.message)));
  })
  .catch(err => Promise.reject(createError(500, err.message)));
};
//exports.fetchPut = function(schemaName, id) {

  //return new Promise((resolve, reject) => {
  //if(!schemaName) return (new Error('Schema required'));

  //if(!id) return (new Error('ID required'));

  // let schema = storage[schemaName];
  // // if(!schema) return (new Error('Schema does not exist'));
  // //let carUrlId = `${__dirname}/../data/${schemaName}${id}.json`;
  // let jsonNote = JSON.stringify(auto);
  // return fs.readFileAsync(`${__dirname}/../data/${schemaName}/${id}.json`)
  // .then((auto) => {
  //   fs.writeFileAsync(`${__dirname}/../data/${schemaName}/${id}.json`, jsonNote)
  //   .then((auto) => {
  //     console.log(auto);
  //   })
  //   .catch(console.error);
  // })
  // .catch(console.error);

//};
