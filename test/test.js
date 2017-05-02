'use strict';
const storage = require('../lib/storage')
const Ninja = require('../model/ninjas')
const expect = require('chai').expect

let newNinja = new Ninja('larry', 'foot', 'pointy stick', 'fe6ec3f7-2990-4984-a4ef-26a704d1d2bd');

describe('ninja module', function(){
  it ('should create a new ninja name', done => {
    expect(newNinja.name).to.equal('larry');
    done();
  });
  it('should have a value for .clan', done => {
    expect(newNinja.clan).to.equal('foot');
    done();
  });
  it('should have a unique uuid value', done => {
    let pattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
    expect(newNinja.id).to.equal(pattern);
    done();
  })
})

//the pattern is the section, number of values in each section 0-9a-f shows its in hex
