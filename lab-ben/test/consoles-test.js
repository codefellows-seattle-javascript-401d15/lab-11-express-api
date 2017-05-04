'use strict';

const chai = require('chai');
const expect = chai.expect;
const Hardware = require('./../model/consoles.js');
const http = require('chai-http');

chai.use(http);

describe('Consoles Constructor test', function() {
  let hardware = new Hardware('Wii', 'Nintendo', 2006);
  it('should have a valid name', () => {
    expect(hardware.name).to.equal('Wii');
  });
  it('should have a valid manufacturer', () => {
    expect(hardware.manufacturer).to.equal('Nintendo');
  });
  it('should have a valid releaseYear', () => {
    expect(hardware.releaseYear).to.equal(2006);
  });
  it('should have a valid id', () => {
    expect(hardware.id).to.exist;
  });
});
