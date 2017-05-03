'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');

module.exports = exports = {};

const URL = `${__dirname}/../data`;

exports.createItem = function(schema, food) {

  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  if(!food) return Promise.reject(createError(400, 'Schema required'));

  return fs.writeFileProm(`${URL}/${food.id}.json`, JSON.stringify(food))
  .then( () => food )
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.updateItem = function(schema, food, id) {

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!id) return Promise.reject(new Error('id required'));

  return fs.readFileProm(`${URL}/${id}.json`)
  .then( oldFood => {
    let stringFood = JSON.parse(oldFood.toString());
    stringFood.name = food.name || stringFood.name;
    stringFood.type = food.type || stringFood.type;
    stringFood.cost = food.cost || stringFood.cost;
    return fs.writeFileProm(`${URL}/${id}.json`, JSON.stringify(stringFood))
    .then(() => stringFood)
    .catch(err => Promise.reject(createError(500, err.message)));

  })
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.fetchItem = function(schema, id) {

  if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!id) return Promise.reject(createError(400, 'id required'));

  return fs.readFileProm(`${URL}/${id}.json`)
  .then(food => food)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.deleteItem = function(schema, id) {

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!id) return Promise.reject(new Error('id required'));

  return fs.unlinkProm(`${URL}/${id}.json`)
  .then(food => food)
  .catch(err => Promise.reject(createError(500, err.message)));
};
