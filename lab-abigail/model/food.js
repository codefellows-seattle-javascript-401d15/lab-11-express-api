'use strict';

const uuid = require('uuid/v4');

module.exports = function(name, type, cost) {
  if(!name || !type) throw new Error('Invalid args');
  this.name = name;
  this.type = type;
  this.cost = cost;
  this.id = uuid();
};
