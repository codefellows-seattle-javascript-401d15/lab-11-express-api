'use strict';

const uuid = require('uuid/v4');

module.exports = function(name, date) {
  // if(!name) return;
  this.name = name;
  this.date = date || new Date();
  this.id = uuid();
};
