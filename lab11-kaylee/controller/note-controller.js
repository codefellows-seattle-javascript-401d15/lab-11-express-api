'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');

module.exports = exports = {};

const DATA_URL = `${__dirname}/../data`;

exports.createNote = function(schema, note) {
  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  if(!note) return Promise.reject(createError(400, 'Note required'));

  let jsonNote = JSON.stringify(note);
  return fs.writeFileProm(`${DATA_URL}/${schema}/${note.id}.json`, jsonNote)
  .then(() => note)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.fetchNote = function(schema, id) {
  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  if(!id) return Promise.reject(createError(400, 'ID required'));

  return fs.readFileProm(`${DATA_URL}/${schema}/${id}.json`)
  .then(data => data)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.updateNote = function(schema, id, newNote) {
  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  if(!id) return Promise.reject(createError(400, 'Valid ID required'));
  if(!newNote) return Promise.reject(createError(400, 'New note required'));

  return fs.readFileProm(`${DATA_URL}/${schema}/${id}.json`)
  .then(data => {
    let oldNote = JSON.parse(data.toString());
    console.log(oldNote, 'this is the oldNote object updateNote');
    if(oldNote.name) oldNote.name = newNote.name;
    if(oldNote.date) oldNote.date = newNote.date;

    return fs.writeFileProm(`${DATA_URL}/${schema}/${id}.json`, JSON.stringify(oldNote));
  })
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.deleteNote = function(schema, id) {
  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  if(!id) return Promise.reject(createError(400, 'ID required'));

  return fs.unlinkProm(`${DATA_URL}/${schema}/${id}.json`)
  .then(data => data)
  .catch(err => Promise.reject(createError(500, err.message)));
};
