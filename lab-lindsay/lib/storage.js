'use strict';

const debug = require('debug')('http:storage');
const storage = {};

module.exports = exports = {};

exports.createCandy = function(schema, candy) {
  debug('#createCandy');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!candy) return Promise.reject(new Error('candy required'));
  if(!storage[schema]) storage[schema] = {};

  storage[schema][candy.id] = candy;

  return Promise.resolve(candy);
};

exports.fetchCandy = function(schema, id) {
  return new Promise((resolve, reject) => {
    debug('#fetchCandy');
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let candy = schemaName[id];
    if(!candy) return reject(new Error('candy not found'));

    resolve(candy);
  });
};

exports.removeCandy = function(schema, id) {
  return new Promise((resolve, reject) => {
    debug('#removeCandy');
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let candy = schemaName[id];
    if(!candy) return reject(new Error('candy not found'));

    delete storage[schema][id];

    resolve();
  });
};

exports.updateCandy = function(schema, id, newCand) {
  return new Promise((resolve, reject) => {
    debug('#updateCandy');
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let candy = schemaName[id];
    if(!candy) return reject(new Error('item not found'));
    console.log(storage[schema]);

    if(newCand.name) candy.name = newCand.name;
    if(newCand.type) candy.type = newCand.type;
    if(newCand.texture) candy.texture = newCand.texture;

    resolve(candy);
  });
};
