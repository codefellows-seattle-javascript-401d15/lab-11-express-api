'use strict';

const DeathNote = require('../model/death-note');
const expect = require('chai').expect;

describe('Death Note module', function() {
  describe('when creating a new Death Note object', function() {
    this.newNote = new DeathNote('Light', 'Ryuuk', 9000);
    it('should belong to Light', done => {
      expect(this.newNote.owner).to.equal('Light');
      done();
    });
    it('should be from Ryuuk', done => {
      expect(this.newNote.shinigami).to.equal('Ryuuk');
      done();
    });
    it('should have 9000 names in it', done => {
      expect(this.newNote.deathCount).to.equal(9000);
      done();
    });
    it('should have an id of a unique uuid value', done => {
      let pattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
      expect(this.newNote.id).to.match(pattern);
      done();
    });
  });
});
