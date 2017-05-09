'use strict';

const Car = require('../model/car');
const expect = require('chai').expect;

describe('car module', function(){
  let newCar = new Car('WRX', 'Subaru', 265);
  it('should have name of "WRX"', done =>{
    expect(newCar.name).to.equal('WRX');
    done();
  });
  it('should have model of "Subaru"', done =>{
    expect(newCar.model).to.equal('Subaru');
    done();
  });
  it('should a horsepower of 265', done =>{
    expect(newCar.horsepower).to.equal(265);
    done();
  });
  it('should have an id of a unique uuid value', done => {
    let pattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
    expect(newCar.id).to.match(pattern);
    done();
  });
});
