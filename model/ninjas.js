'use strict';

const debug = require('debug')('http:ninjas');
const uuid = require('uuid/v4');

module.exports = function(name, clan, weapons) {
  if(!name || !clan || !weapons) throw new Error('Invalid Arguments');
  this.name = name;
  this.clan = clan;
  this.weapons = weapons;
  this.id = uuid();
};
