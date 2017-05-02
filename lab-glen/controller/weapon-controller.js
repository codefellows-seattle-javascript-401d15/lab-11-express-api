'use strict';

const debug = require('debug')('http:storage');
const Promise = require ('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix : 'Async'});
const pathUrl = `${__dirname}/../data`;

module.exports = exports = {};

exports.createItem = function (blueprint, item) {
  debug('#createItem');

  return fs.statAsync(`${pathUrl}`)
  .catch(err => {
    err.status = 400;
    return Promise.reject(err);
  })
  .then(() => {
    return fs.writeFileAsync(`${pathUrl}/${blueprint}:${item.id}.json`,
    JSON.stringify(item));
  })
  .then (() => {
    return Promise.resolve(item);
  });
};


exports.fetchItem = function (blueprint, id) {
  debug('#fetchItem');
  let pathUrlId = `${pathUrl}/${blueprint}:${id}.json`;

  return fs.statAsync(pathUrlId)
  .catch(err => {
    err.status = 404;
    return Promise.reject(err);
  })
  .then(() => {
    return fs.readFileAsync(pathUrlId);
  })

  .then((data) => {
    return Promise.resolve(JSON.parse(data.toString()));
  });

};

exports.updateItem = function (blueprint, id, newWeapon) {
  debug('#updateItem');
  let pathUrlId = `${pathUrl}/${blueprint}:${id}.json`;

  if(!blueprint) return Promise.reject(new Error('Blueprint required'));
  if(!id) return Promise.reject(new Error('ID required'));

  return fs.readFileAsync(`${pathUrlId}`)
  .then( (item) => {
    console.log(item);
    item = JSON.parse(item);
    if(newWeapon.name) item.name = newWeapon.name;
    if(newWeapon.type) item.type = newWeapon.type;
    if(newWeapon.price) item.price = newWeapon.price;
    fs.writeFileAsync(`${pathUrlId}`, JSON.stringify(item))
    .then((item) => {
      console.log(item);
    })
    .catch(console.error);
  })
  .catch(console.error);
};

exports.deleteItem = function (blueprint, id) {
  debug('#deleteItem');
  let pathUrlId = `${pathUrl}/${blueprint}:${id}.json`;

  return fs.statAsync(pathUrlId)
  .catch(err => {
    err.status = 404;
    return Promise.reject(err);
  })
  .then(() => {
    return fs.unlinkAsync(pathUrlId);
  })
  .then(() => {
    return Promise.resolve();
  });

};
