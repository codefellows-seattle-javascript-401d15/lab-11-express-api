'use strict';

const uuid = require('uuid/v4');
const createError = require('http-errors');


module.exports = function(name, manufacturer, releaseYear) {
  if(!name || !manufacturer || !releaseYear) throw createError(400, 'argument(s) required');

  this.name = name;
  this.manufacturer = manufacturer;
  this.releaseYear = releaseYear;
  this.id = uuid();
};
