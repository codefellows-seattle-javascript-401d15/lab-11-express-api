'use strict';

const uuid = require('uuid/v4');

module.exports = function(name, type, color) {
  if(!name || !type) throw new Error('Invalid arguments');
  this.name = name;
  this.type = type;
  this.color = color;
  this.id = uuid();
};
