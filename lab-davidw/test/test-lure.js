'use strict';

const Lure = require('../model/lure.js');
const expect = require('chai').expect;

describe('fishingLure module', function() {
  let newLure = new Lure('momba', 'rattler', 'trout');
  console.log(newLure);
  describe('when adding a new fishing lure', function() {
    it('should have a string for the name, "momba"', done => {
      expect(newLure).to.have.property('name')
      .that.is.a('string')
      .that.equals('momba');
      done();
    });
    it('should have string for the type, "rattler"', done => {
      expect(newLure).to.have.property('type')
      .that.is.a('string')
      .that.equals('rattler');
      done();
    });
    it('should have a string for targets, "trout"', done => {
      expect(newLure).to.have.property('targets')
      .that.is.a('string')
      .that.equals('trout');
      done();
    });
    it('should have a string for water, "fresh"', done => {
      expect(newLure).to.have.property('water')
      .that.is.a('string')
      .that.equals('fresh');
      done();
    });
    it('should have an id of a unique uuid value', done => {
      expect(newLure.id).to.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
      done();
    });
    it('should have a date value, as provided by the js Date constructor', done => {//2017-05-02T04:42:58.106Z
      expect(newLure.date).to.match(/[0-9a-f]{4}-[0-9a-f]{2}:[0-9a-f]{5}:[0-9a-f]{2}:[0-9a-f]{2}.[0-9a-f]{4}/);
      done();
    });
  });
});
