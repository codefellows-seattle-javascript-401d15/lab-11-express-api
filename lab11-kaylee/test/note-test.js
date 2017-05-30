'use strict';

const Note = require('../model/note');
const expect = require('chai').expect;

describe('note module', function() {
  describe('when creating a new Note object', function() {
    let newNote = new Note('to-do list', 'April 15');
    it('should have a name of "to-do list"', done => {
      expect(newNote.name).to.equal('to-do list');
      done();
    });
    it('should have a date of "April 15"', done => {
      expect(newNote.date).to.equal('April 15');
      done();
    });
    it('should have an id of a unique uuid value', done => {
      let pattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
      expect(newNote.id).to.match(pattern);
      done();
    });
  });
});
