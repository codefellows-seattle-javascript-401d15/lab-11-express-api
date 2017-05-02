'use strict';

const uuid = require('uuid/v4');

module.exports = function(name, universe) {
  this.name = name;
  this.universe = universe;
  this.id = uuid();
};
