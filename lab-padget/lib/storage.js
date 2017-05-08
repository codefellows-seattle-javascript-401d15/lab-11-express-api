'use strict';
// 4. storage.

// require debug module function and call it.
const debug = require('debug')('http:storage');
// all the instances of schema when we create an item.
// {schemaOne: {idOne: {}}, {idTwo: {}}, schemaTwo: {}}
const storage = {};

// instantiated empty object is an exports alias.
module.exports = exports = {};

// create an item and set it into storage.
exports.createItem = function(schema, item) {
  debug('#createItem');
  // if no schema, return reject with error.
  if(!schema) return Promise.reject(new Error('schema required'));
  if(!item) return Promise.reject(new Error('item required'));

  // dynamically set a new property on an object.
  // storage['kidToy'] = {} storage.schema = {}
  // take the value of schema, make or get that property.
  // looking for a property with name .schema, not .kidToy.
  if(!storage[schema]) storage[schema] = {};

  // assigned item to primary key.
  // when we create an item it will already have an id.
  storage[schema][item.id] = item;

  // resolve that item and return a promise.
  return Promise.resolve(item);
};

// need schema name and id so we can look up an instance.
exports.fetchItem = function(schema, id) {
  debug('#fetchItem');

  // returning new promise will get us instance of an item.
  return new Promise((resolve, reject) => {
    // error handling and schema checking.
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    // schema name exists.
    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    // assign to item.
    let item = schemaName[id];
    if(!item) return reject(new Error('item not found'));

    // we know it exists, so send it back, returned a promise.
    resolve(item);
  });
};

// router takes an endpoint and a callback.
// this.routes.PUT[endpoint] = callback;
exports.putItem = function(schema, id) {
  debug('#putItem');
  console.log(id);
};

exports.deleteItem = function(schema, id) {
  debug('#deleteItem');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let item = schemaName[id];
    if(!item) return reject(new Error('item not found'));

    delete(schemaName[id]); // delete object
    resolve(item); // or nothing
  });
};
