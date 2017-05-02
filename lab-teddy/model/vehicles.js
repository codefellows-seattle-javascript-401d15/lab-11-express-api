'use strict';

const debug = require('debug')('http:vehicles');
const uuid = require('uuid/v4');

module.exports = function(name, type){
  debug('#vehicles constructor');
  if(!name || !type) throw new Error('Invalid arguments');
  this.name = name;
  this.type = type;
  this.id = uuid();
};
