'use strict';

const debug = require('debug')('http:candy');
const uuid = require('uuid/v4');

module.exports = function(name, type, texture) {
  if(!name || !type) throw new Error('Invalid arguments');
  this.name = name;
  this.type = type;
  this.texture = texture;
  this.id = uuid();
};
