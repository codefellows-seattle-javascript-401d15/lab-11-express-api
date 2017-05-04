'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');
const DATA_URL = `${__dirname}/../data`;


module.exports = exports = {};


exports.createCar = function(schema, car) {
  if(!schema) return (new Error('schema required'));
  if(!car) return (new Error('car required'));

  let jsonStorage = JSON.stringify(car);
  return fs.writeFileProm(`${DATA_URL}/${schema}/${car.id}.json`, jsonStorage)
  .then(() => car)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.fetchCar = function(schema, id){

  return new Promise((resolve, reject) => {
    if(!schema) return reject (new Error('schema required'));
    if(!id) return reject (new Error('id require'));

    return fs.readFileProm(`${DATA_URL}/${schema}/${id}.json`)
    .then(data => resolve(data))
    .catch(err => Promise.reject(createError(500, err.message)));
  });

};

exports.updateCar = function(schema, car, id){

  if(!schema) return Promise.reject(createError(400, 'Schema Required'));
  if(!car) return Promise.reject(createError(400, 'Car Required'));
  let jsonStorage;

  return fs.readFileProm(`${DATA_URL}/${schema}/${id}.json`)
  .then(data => {
    let carStorage = JSON.parse(data.toString());
    carStorage.name = car.name || carStorage.name;
    carStorage.type = car.type || carStorage.type;
    carStorage.wheels = car.wheels || carStorage.wheels;
    carStorage.date = car.date || carStorage.date;

    jsonStorage = JSON.stringify(carStorage);

    return fs.writeFileProm(`${DATA_URL}/${schema}/${id}.json`, jsonStorage)
    .then(() => jsonStorage)
    .catch((err) => Promise.reject(createError(500, err.message)));
  })
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.removeCar = function(schema, id){
  if(!schema) return (new Error('Schema required'));
  if(!id) return (new Error('ID required'));

  return fs.unlinkProm(`${DATA_URL}/${schema}/${id}.json`)
  .then(data => data)
  .catch(err => Promise.reject(createError(500, err.message)));
};
