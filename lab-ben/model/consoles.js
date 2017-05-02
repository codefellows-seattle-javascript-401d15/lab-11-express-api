'use strict';

const uuid = require('uuid/v4');


module.exports = function(name, manufacturer, releaseYear) {
  this.name = name;
  this.manufacturer = manufacturer;
  this.releaseYear = releaseYear;
  this.id = uuid();
};
