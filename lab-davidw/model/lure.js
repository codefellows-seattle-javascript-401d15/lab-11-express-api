'use strict';

const uuid = require('uuid/v4');

module.exports = function(name, type, targets, water='fresh', date) {
  this.name = name,
  this.type = type,
  this.targets = targets,
  this.water = water,
  this.date = date || new Date(),
  this.id = uuid();
};
