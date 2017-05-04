'use strict';

const uuid = require('uuid/v4');

module.exports = function(name, clan, weapons) {
  this.name = name;
  this.clan = clan;
  this.weapons = weapons;
  this.id = uuid();
};
