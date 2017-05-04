'use strict';

const debug = require('morgan');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');

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
  if(!schema) return Promise.reject(createError(400, '!!No schema!! Schema Required'));
  if(!id) return Promise.reject(createError(400, '!!No id!! id required'));

  return fs.readFileProm(`${DATA_URL}/${schema}/${id}.json`)
  .then(data => data)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.updateNote = function(schema, note){
  debug('#updateNote');
  if(!schema) return Promise.reject(createError(400, '!!No schema!! Schema Required'));
  if(!note) return Promise.reject(createError(400, '!!No note!! Note required'));

  return fs.readFileProm(`${DATA_URL}/${schema}/${note.id}.json`)
  .catch(err => console.error(err))
  .then(data => {
    let storage = JSON.parse(data.toString());
    storage.name = note.name || storage.name;
    storage.details = note.details || storage.details;
    storage.date = note.date || storage.date;

    let jsonStorage = JSON.stringify(storage);

    return fs.writeFileProm(`${DATA_URL}/${schema}/${note.id}.json`, jsonStorage)
    .then(note => {
      console.log(note);
    })
    .catch(err => Promise.reject(createError(500, err.message)));
  });
};


exports.deleteNote = function(schema, note){
  debug('#deleteNote');
  if(!schema) return Promise.reject(createError(400, '!!No Schema!!'));
  if(!note) return Promise.reject(createError(400, '!!No Note!!'));

  return fs.unlinkProm(`${DATA_URL}/${schema}/${note.id}.json`)
  .catch(err => console.error(err))
  .then(() => {
    return Promise.resolve(note);
  });
};
