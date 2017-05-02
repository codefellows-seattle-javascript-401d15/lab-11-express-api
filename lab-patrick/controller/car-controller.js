'use strict';

const Promise =require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix:'Prom'});

const createError = require('http-errors');

module.exports = exports = {};

const DATA_URL =`${__dirname}/../data`;

exports.createItem = function(schema, car){
  if(!schema) return Promise.reject(createError(400, 'Scheme required'));
  if(!car) return Promise.reject(createError(400, 'Car required'));

  let jsonCar = JSON.stringify(car);
  return fs.writeFileProm(`${DATA_URL}/${schema}/${car.id}.json`, jsonCar)
  .then(()=> car)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.fetchItem = function(schema, id){
  if(!schema) return Promise.reject(createError(400, 'Scheme required'));
  if(!id) return Promise.reject(createError(400, 'Id required'));

  return fs.readFileProm(`${DATA_URL}/${schema}/${id}.json`)
  .then(data => data)
  .catch(err => Promise.reject(createError(400, err.message)));
};

exports.updateItem = function(schema, id, updateCar){
  console.log('got here');
  if(!schema) return Promise.reject(createError(400, 'Scheme required'));
  if(!id) return Promise.reject(createError(400, 'Id required'));

  return fs.readFileProm(`${DATA_URL}/${schema}/${id}.json`)
  .then(data => {
    let dataString = JSON.parse(data.toString());
    if(updateCar.name) dataString.name = updateCar.name;
    if(updateCar.model) dataString.model = updateCar.model;
    if(updateCar.horsepower) dataString.horsepower = updateCar.horsepower;
    fs.writeFIleProm(`${DATA_URL}/${schema}/${id}.json`, JSON.stringify(dataString));
  })
  .catch(err => Promise.reject(createError(400, err.message)));
};

exports.deleteItem = function(schema, id){
  if(!schema) return Promise.reject(new Error('shema required'));
  if(!id) return Promise.reject(new Error('id required'));

  return fs.unlinkProm(`${DATA_URL}/${schema}/${id}.json`)
  .catch(err => Promise.reject(createError(400, err.message)));
};
