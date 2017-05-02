'use strict';

const debug = require('debug')('http:song');
const uuid = require('uuid/v4');

module.exports = function(title, artist, album) {
  debug('song()');
  if(!title && !artist && !album) throw new Error('You must enter the title, artist, and album');
  this.title = title;
  this.artist = artist;
  this.album = album;
  this.id = uuid();
};
