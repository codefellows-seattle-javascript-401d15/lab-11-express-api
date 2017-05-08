'use strict';
// 1. constructor.

// require debug module function and call it.
const debug = require('debug')('http:music');
const uuid = require('uuid/v4');

module.exports = function(artist, album, song) {
  debug('#music');
  if(!artist || !album) throw new Error('Invalid arguments');
  this.artist = artist;
  this.album = album;
  this.song = song;
  this.id = uuid();
};
