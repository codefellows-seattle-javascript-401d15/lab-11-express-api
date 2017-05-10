'use strict';

const uuid = require('uuid/v4');

module.exports = function(name, model, horsepower){
  this.name = name;
  this.model = model;
  this.horsepower = horsepower;
  this.id = uuid();
};
