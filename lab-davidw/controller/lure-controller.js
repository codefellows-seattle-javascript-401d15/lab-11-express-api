'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');
const DATA_URL = `${__dirname}/../data`;
// const app = require('express');
// const morgan = require('morgan');
// const mkdirp = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

// app.use(morgan);

module.exports = exports = {};

exports.createItem = function(schema, item) {
  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  if(!item) return Promise.reject(createError(400, 'item required'));

  let  jsonItem = JSON.stringify(item);
  return fs.writeFileProm(`${DATA_URL}/${schema}/${item.id}.json`, jsonItem)
  .then(() => item)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.fetchItem = function(schema, id) {
  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  if(!id) return Promise.reject(createError(400, 'Id required'));

  return fs.readFileProm(`${DATA_URL}/${schema}/${id}.json`)
    .then(data => data)
    .catch(err => Promise.reject(createError(500, err.message)));
};

exports.updateItem = function(schema, id, newItem) {

  if(!schema) return Promise.reject(createError(412, 'Schema to be updated required'));
  if(!id) return Promise.reject(createError(412, 'item to be updated required'));

  return fs.readFileProm(`%{DATA_URL}/${id}.json`)
  .then( item => {
    let  stringItem = JSON.parse(item.toString());
    if(newItem.name) stringItem.name = newItem.name;
    if(newItem.type) stringItem.type = newItem.type;
    if(newItem.targets) stringItem.targets = newItem.targets;
    if(newItem.water) stringItem.water = newItem.water;
    if(newItem.date) stringItem.date = newItem.date;

    return fs.writeFileProm(`${DATA_URL}/${schema}/${item.id}.json`, JSON.stringify(stringItem));

  })
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.deleteItem = function(schema, id) {
  if(!schema) return Promise.reject(new Error(400, 'schema required'));
  if(!id) return Promise.reject(new Error(400, 'Id required'));

  return fs.unlinkProm(`${DATA_URL}/../data/${schema}/${id}.json`)
  .then(() => {
    console.log(`${schema}, ${id}, has been deleted.`);
  })
  .catch(err => Promise.reject(new Error(404, err.message)));
};
