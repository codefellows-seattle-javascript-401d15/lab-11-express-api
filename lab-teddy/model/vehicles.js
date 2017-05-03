'use strict';

const debug = require('debug')('http:vehicles');
const uuid = require('uuid/v4');

module.exports = function(name, type, wheels, allWheelDrive){
  debug('#vehicles constructor');
  if(!name || !type || !wheels || !allWheelDrive) throw new Error('Invalid arguments');
  this.name = name;
  this.type = type;
  this.wheels = wheels;
  this.allWheelDrive = allWheelDrive || false;
  this.id = uuid();
};
