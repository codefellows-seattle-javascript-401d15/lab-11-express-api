'use strict';

const debug = require('debug')('http:cat');
const uuid = require('uuid/v4');
const createError = require('http-errors');

module.exports = function(name, mood) {
  debug('#Cat');
  if(!name) throw createError(400, 'Expected name');
  if(!mood) throw createError(400, 'Expected content');
  this.name = name;
  this.mood = mood;
  this.id = uuid();
};
