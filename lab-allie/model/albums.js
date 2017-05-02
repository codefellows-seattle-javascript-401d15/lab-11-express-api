'use strict';

const uuid = require('uuid/v4');

module.exports = function(artist, title, year, dateCreated) {
  if (!artist || !title || !year) throw new Error('Please enter a valid artist, title, and year');
  this.artist = artist,
  this.title = title,
  this.year = year,
  this.date = dateCreated || new Date();
  this.id = uuid();
};