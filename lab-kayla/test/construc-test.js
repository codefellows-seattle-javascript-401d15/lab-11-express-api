'use strict';

const Dragon = require('../model/data');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http)

describe('killer-dragon module', function() {
  describe('when creating a new dragon object', function() {
    this.newDragon = new Dragon('Phil', 'big', true)

    it('should create a new dragon', done => {
      expect(this.newDragon.name).to.equal('Phil')
      done()
    })
    it('should have a type of big', done => {
      expect(this.newDragon.type).to.equal('big')
      done()
    })
    it('should have a killer of "true"', done => {
      expect(this.newDragon.killer).to.be.true
      done()
    })
    it('should have an id of a unique uuid value', done => {
      let pattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
      expect(this.newDragon.id).to.match(pattern)
      done()
    })
  })
})
