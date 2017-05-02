'use strict';

const Watch = require('../model/watch');
const expect = require('chai').expect;

describe('watch module', function() {
  let newWatch = new Watch('Sekonda', 'black', 'small');
  it('should create a new watch object with a brand Sekonda', done => {
    expect(newWatch.brand).to.equal('Sekonda');
    done();
  });
  it('should create a new watch object with a color black', done => {
    expect(newWatch.color).to.equal('black');
    done();
  });
  it('should create a new watch object with a size small', done => {
    expect(newWatch.size).to.equal('small');
    done();
    it('should have an id of a unique uuid value', done => {
    // xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx
      let pattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
      expect(newWatch.id).to.match(pattern);
      done();
    });
  });
});
