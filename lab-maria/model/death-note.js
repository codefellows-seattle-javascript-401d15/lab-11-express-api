'use strict';

const uuid = require('uuid/v4');

module.exports = function(owner, shinigami, deathCount) {
  this.owner = owner;
  this.shinigami = shinigami;
  this.deathCount = deathCount;
  this.id = uuid();
};
