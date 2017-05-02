'use strict';

const Car = require('../model/vehicles');
const expect = require('chai').expect;

describe('vehicles module', function(){
  describe('when creating a new vehicle object', function(){
    this.newCar = new Car('lambo', 'super car');
    it('should have a name of "lambo"', done => {
      expect(this.newCar.name).to.equal('lambo');
      done();
    });
    it('should have a type of "super car"', done => {
      expect(this.newCar.type).to.equal('super car');
      done();
    });
    it('should have an id of a unique uuid value', done => {
      let pattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
      expect(this.newCar.id).to.match(pattern);
      done();
    });
  });
});
