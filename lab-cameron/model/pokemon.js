'use strict';

const uuid = require('uuid/v4');

module.exports = function(name, type) {
  this.name = name;
  this.type = type;
  this.id = uuid();
};
