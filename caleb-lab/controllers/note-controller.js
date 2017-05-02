'use strict';

const debug = require('morgan');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const express = require('express');
const app = express();
const DATA_URL = `${__dirname}/../data`;

module.exports = exports = {};

exports.createNote = function(schema, note){
  debug('#createNote');
  if(!schema) return Promise.reject(createError(400, 'No schema; Schema Required'));
  if(!note) return Promise.reject(createError(400, 'No note; Note required.'));

  let jsonNote = JSON.stringify(note);
  return fs.writeFileProm(`${DATA_URL}/${schema}/${note.id}.json`, jsonNote)
  .then(() => note)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.fetchNote = function(schema, id){
  debug('#createNote');
  if(!schema) return Promise.reject(createError(400, 'No schema; Schema Required'));
  if(!id) return Promise.reject(createError(400, 'No id; id required'));

  return fs.readFileProm(`${DATA_URL}/${schema}/${id}.json`)
  .then(data => data)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.updateNote = function(schema, note){
  debug('#updateNote');
  if(!schema) return Promise.reject(createError(400, 'No schema; Schema Required'));
  if(!note) return Promise.reject(createError(400, 'No note; Note required'));

  let writeFile = note;
  let jsonNote = JSON.stringify(note);
  return fs.statProm(`${DATA_URL}/${schema}/${note}.json`)
  .catch(err => console.error(err))
  .then(() => {
    return fs.writeFileProm(`${DATA_URL}/${schema}/${writeFile}.json`, jsonNote)
    .then(note => {
      console.log(note);
    });
  })
  .then(() => {
    return Promise.resolve(note);
  });
};
