'use strict';

const debug = require('debug')('http:watch');
const uuid = require('uuid/v4');

module.exports = function (brand, color, size) {
  if(!brand || !color) throw new Error('Invalid arguments');
  this.brand = brand;
  this.color = color;
  this.size = size;
  this.id = uuid();
};
