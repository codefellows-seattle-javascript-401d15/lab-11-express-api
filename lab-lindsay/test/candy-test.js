'use strict';

const http = require('chai-http');
const chai = require('chai');
const Candy = require('../model/candy');
const expect = chai.expect;

chai.use(http);

describe('candy module', function() {
  let newCandyBar = new Candy('snickers', 'bar', 'chewy');
  it('should create a new candy object with name snickers', done => {
    expect(newCandyBar.name).to.equal('snickers');
    done();
  });
  it('should create a new candy object with type bar', done => {
    expect(newCandyBar.type).to.equal('bar');
    done();
  });
  it('should create a new candy object with texture chewy', done => {
    expect(newCandyBar.texture).to.equal('chewy');
    done();
  });
  it('should have an id of a unique uuid value', done => {
    let pattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
    expect(newCandyBar.id).to.match(pattern);
    done();
  });
});
