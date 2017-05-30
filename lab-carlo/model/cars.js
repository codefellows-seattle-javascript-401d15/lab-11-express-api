'use strict';

const uuid = require('uuid/v4');

module.exports = function(make, model) {
  if(!make || !model) throw new Error('Invalid arguments');
  this.make = make;
  this.model = model;
  this.id = uuid();
};
