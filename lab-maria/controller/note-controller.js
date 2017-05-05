'use strict';

const debug = require('debug')('http:storage');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');

const storage = {};

module.exports = exports = {};

exports.noteArray = [];

const DATA_URL = `${__dirname}/../data`;

function checkDir(directory, callback) {
  fs.stat(directory, function(err) {
    if(err && err.errno == '-2') {
      console.log('dir does not exist yet');
      fs.mkdir(directory, callback);
    } else {
      callback(err);
    }
  });
}

exports.createNote = function(schemaName, note) {
  debug('#create note');
  if(!schemaName) return Promise.reject(new Error('mising schema'));
  if(!note) return Promise.reject(new Error('missing note'));

  if(!storage[schemaName]) storage[schemaName] = {};

  storage[schemaName][note.id] = note;
  exports.noteArray.push(note.id);

  checkDir(`${DATA_URL}/${schemaName}/`, function(err) {
    if(err) console.error(err.message);
    fs.writeFileProm(`${DATA_URL}/${schemaName}/${note.id}.json`, JSON.stringify(note), function(err){
      if(err) console.error(err.message);
    }).then(() => note)
    .catch(err => Promise.reject(createError(400, err.message)));
  });
  return Promise.resolve(note);
};

exports.fetchNote = function(schemaName, id) {
  debug('#fetch note');
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('mising schema'));
    if(!id) return reject(new Error('missing note-id'));

    let schema = storage[schemaName];
    if(!schema) return reject(new Error('schema does not exist'));

    let note = schema[id];
    if(!note) return reject(new Error('note does not exist'));

    resolve(fs.readFileProm(`${DATA_URL}/${schemaName}/${note.id}.json`)
      .then(data => {
        try {
          return JSON.parse(data.toString());
        } catch (err) {
          return reject(err);
        }
      })
      .catch(err => Promise.reject(createError(400, err.message)))
    ); //close resolve
  }); // close return new promise
}; // close fetchNote

exports.fetchAll = function(schemaName) {
  debug('#fetch all');
  return new Promise((resolve, reject) => {

    let schema = storage[schemaName];

    let notes = [];

    function objectLength(object) {
      for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
          notes.push(object);
        }
      }
      return notes;
    }

    resolve(objectLength(schema))
    .then(data => {
      try {
        return JSON.parse(data.toString());
      } catch (err) {
        return reject(err);
      }
    })
    .catch(err => Promise.reject(createError(400, err.message)));
  });
};

exports.updateNote = function(schemaName, id, updatedNote) {
  debug('#update note');
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('mising schema'));
    if(!id) return reject(new Error('cannot put; missing note-id'));

    let schema = storage[schemaName];
    if(!schema) return reject(new Error('schema does not exist'));

    let note = schema[id];
    if(!note) return reject(new Error('cannot put; note does not exist'));

    fs.readFileProm(`${DATA_URL}/${schemaName}/${id}.json`)
      .then(data => {
        let jsonified = JSON.parse(data.toString());
        if(updatedNote.owner) jsonified.owner = updatedNote.owner;
        if(updatedNote.shinigami) jsonified.shinigami = updatedNote.shinigami;
        if(updatedNote.deathCount) jsonified.deathCount = updatedNote.deathCount;
        jsonified = JSON.stringify(jsonified);
        fs.writeFileProm(`${DATA_URL}/${schemaName}/${note.id}.json`, jsonified);

        resolve(jsonified);
      });
  }).catch(err => Promise.reject(createError(400, err.message)));
};

exports.deleteNote = function(schemaName, id) {
  debug('#delete note');
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('mising schema'));
    if(!id) return reject(new Error('missing note-id'));

    delete storage[schemaName][id];

    for(let i=0; i< exports.noteArray.length; i++){
      if(id === exports.noteArray[i]){
        exports.noteArray.splice(i, 1);
      }
    }
    fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
      .then(() => {
        console.log('deleted Successfully');
        resolve();
      })
      .catch(err => console.error(err.message));
  });
};


exports.deleteDir = function(schemaName) {
  debug('#delete dir');
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('mising schema'));

    delete storage[schemaName];

    fs.stat(`${DATA_URL}/${schemaName}`, function(err) {
      if(err && err.errno == '-2') {
        return reject(new Error('dir does not exist'));
      } else {
        fs.rmdir(`${DATA_URL}/${schemaName}`, err => {
          if(err) return reject(err);
          resolve();
        });
      } // close else
    }); //close fs.stat
  }); // close promise
}; //cose deleteDir
