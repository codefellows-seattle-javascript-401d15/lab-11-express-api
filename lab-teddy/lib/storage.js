'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('http:storage');
const storage = {};

module.exports = exports = {};

exports.createCar = function(schema, car) {
  debug('#createCar');
  if(!schema) return (new Error('schema required'));
  if(!car) return (new Error('car required'));
  if(!storage[schema]) storage[schema] = {};

  storage[schema][car.id] = car;

  fs.writeFileProm(`./data/${car.id}.txt`, JSON.stringify(car))
  .then(data => {
    console.log('call fs.writefileprom', data);
  })
  .catch(console.error('Error in createCar route'));
};

exports.fetchCar = function(schemaName, id){
  debug('#fetchCar');

  if(!schema) return (new Error('schema required'));
  if(!id) return (new Error('id require'));

  let schema = storage[schemaName];
  if(!schema) return (new Error('schema not found'));

  let car = schema[id];
  if(!car) return (new Error('car not found'));

  return fs.readFileProm(`./data/$(id).txt`)
  .then(data => {
    console.log('call fs.readFileProm');
    console.log('json.parse data', JSON.parse(data));
    return JSON.parse(data);
  })
  .catch(console.error('error in fs.readFileProm'));
};

exports.updateCar = function(schema, car){
  debug('#updateCar');
  if(!schema) return (new Error('Schema required'));
  if(!car) return (new Error('Car Required'));

  let schemaName = storage[schema];
  if(!schemaName) return (new Error('Schema does not exist'));

  if(!schemaName[car.id]) return (new Error('Car does not exist'));

  fs.readFileProm(`./data/${car.id}.txt`)
  .then(data => {
    console.log((data.toString('utf-8', 0, 16)));
    fs.writeFileProm(`./data/${car.id}.txt`, JSON.stringify(car))
    .then(data => {
      console.log('Called fs.writeFileProm');
      return JSON.parse(data);
    })
    .catch(console.error);
  });
};

exports.removeCar = function(schema, id){
  debug('#removeCar');
  if(!schema) return (new Error('Schema required'));
  if(!id) return (new Error('ID required'));

  return fs.unlinProm(`./data/${id}.txt`)
  .then(data => {
    console.log('Called fs.unlinkProm', data);
  })
  .catch(console.error('error in fs.unlinkProm'));
};
