'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');

module.exports = exports = {};

const URL = `${__dirname}/../data`

exports.createItem = function(schema, food) {

  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  if(!food) return Promise.reject(createError(400, 'Schema required'));


  return fs.writeFileProm(`${URL}/${food.id}.json`, JSON.stringify(food))
  .then( () => food )
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.updateItem = function(schema, id, newFood) {
  debug('#updateItem');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!id) return Promise.reject(new Error('id required'));

  return fs.readFileProm(`${URL}/${id}.json`)
  .then( food => {
    let stringFood = JSON.parse(food.toString());
    if (newFood.name) stringFood.name = newFood.name;
    if (newFood.type) stringFood.type = newFood.type;
    if (newFood.cost) stringFood.cost = newFood.cost;
    fs.writeFileProm(`${URL}/${id}.json`, JSON.stringify(stringFood));
  })
  .catch(console.error);
};

exports.fetchItem = function(schema, id) {
  debug('#fetchItem');
  if(!schema) return Promise.reject(new Error('shema required'));
  if(!id) return Promise.reject(new Error('id required'));

  return fs.readFileProm(`${URL}/${id}.json`)
  .then(food => {
    return JSON.parse(food);
  })
  .catch(console.error);
};

exports.deleteItem = function(schema, id) {
  debug('#deleteItem');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!id) return Promise.reject(new Error('id required'));

  return fs.unlinkProm(`${URL}/${id}.json`)
  .then(food => {
    console.log('Food deleted');
  })
  .catch(console.error);
};
