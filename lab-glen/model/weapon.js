'use strict';

const uuid = require('uuid/v4');

module.exports = function(name, type, price) {
  this.name = name
  this.type = type
  this.price = price
  this.id = uuid()
}
