'use strict';

const uuid = require('uuid/v4');

module.exports = function(name, type, targets, water='fresh') {
  this.name = name,
  this.type = type,
  this.targets = targets,
  this.water = water,
  this.id = uuid();
};
