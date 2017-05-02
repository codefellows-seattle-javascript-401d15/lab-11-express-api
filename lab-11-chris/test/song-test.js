'use strict';

const Song = require('../model/song');
const expect = require('chai').expect;

describe('Song model', () => {
  let newSong = new Song('wat', 'yo', 'up');

  it('should make a new song', done => {
    expect(newSong.id).to.exist;
    done();
  });

  it('should have title property', done => {
    expect(newSong.title).to.equal('wat');
    done();
  });
});
