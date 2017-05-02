'use strict';

const debug = require('debug')('#http:storage');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

exports.createHawk = function(schema, hawk){
  debug('#createHawk');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!hawk) return Promise.reject(new Error('hawk required'));
  fs.mkdirProm(`${__dirname}/../data/${schema}`, function(err){ // add a check to see if dir already exists?
    if(err) return Promise.reject(new Error(err));
  }).then(fs.writeFileProm(`${__dirname}/../data/${schema}/${hawk.id}.json`, JSON.stringify(hawk), function(err){
    if (err) return Promise.reject(new Error(err));
  })
);

  return Promise.resolve(hawk);
};

exports.fetchHawk = function(schema, id){
  debug('#fetchHawk');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`, function(err){
      if (err) return Promise.reject(new Error(err));
    }).then((hawk) => {
      return resolve(JSON.parse(hawk.toString()));
    }).catch(err => {
      return reject(err);
    });

  });
};


exports.deleteHawk = function(schema, id){
  debug('#deleteHawk');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    fs.unlinkProm(`${__dirname}/../data/${schema}/${id}.json`, function(err){
      if (err) return reject(new Error(err));
    });

    return resolve(id);
  });
};
