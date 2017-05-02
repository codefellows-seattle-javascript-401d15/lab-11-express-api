'use strict';

const debug = require('debug')('http:storage');
const storage = {};
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

exports.createItem = function(schema, item) {
  debug('#createItem');

  if(!schema) return (new Error('schema require'));
  if(!item) return (new Error('item required'));
  if(!storage[schema]) storage[schema] = {};

  storage[schema][item.id] = item;

  fs.writeFileProm('./data/${item.id}.txt', JSON.stringify(item))
  .then(data => {
    console.log('called fs.writeFileProm', data);
  })
  .catch(console.error('Error in createItem route'));
};

exports.fetchItem = function(schema, id) {
  debug('#fetchItem');

  if(!schema) return (new Error('schema required'));
  if(!id) return (new Error('id required'));

  let schemaName = storage[schema];
  if(!schemaName) return (new Error('item not found'));

  let watch = schema[id];
  if (!watch) return (new Error('Watch does not exist'));

  return fs.readFileProm(`./data/${id}.txt`)
  .then(data => {
    console.log('json.parse data', JSON.parse(data));
    return JSON.parse(data);
  })
  .catch(console.error('error in fs.readFileProm'));
};

exports.updateItem = function(schema, id){
  debug('#updateItem');

  if(!schema) return (new Error('schema required'));
  if(!id) return (new Error('id required'));

  let schemaName = storage[schema];
  if(!schemaName) return (new Error('schema not found'));

  if(!schema[id]) return (new Error('Watch does not exist'));

  return fs.readFileProm(`./data/${id}.txt`)
    .then(data => {
      fs.writeFileProm(`./data/${id}.txt`)
      .then(data => {
        return JSON.parse(data);
      });
      console.log('json.parse data', JSON.parse(data));
      return JSON.parse(data);
    })
    .catch(console.error('error in fs.readFileProm'));
};


exports.deleteItem = function(schema, id){
  debug('#deleteItem');
  if(!schema) return (new Error('schema required'));
  if(!id) return (new Error('id required'));

  return fs.unlinkProm(`./data/${id}.txt`)
  .then(data => {
    console.log('Called fs.unlinkProm', data);
  })
  .catch(console.error)
};
