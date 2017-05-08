'use strict';
// 8. music tests.

const Music = require('../model/music');
const expect = require('chai').expect;

describe('music module', function() {
  describe('when creating a new music object', function() {
    this.Music = new Music('artist', 'album', true);
    it('should have a name of "artist"', done => {
      expect(this.Music.artist).to.equal('artist');
      done();
    });
    it('should have a type of "album"', done => {
      expect(this.Music.album).to.equal('album');
      done();
    });
    it('should have a song "true"', done => {
      expect(this.Music.song).to.be.true;
      done();
    });
    it('should have an id of a unique uuid value', done => {
      let pattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
      expect(this.Music.id).to.match(pattern);
      done();
    });
  });
});
