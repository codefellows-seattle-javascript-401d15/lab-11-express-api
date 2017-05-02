const http = require('chai-http');
const chai = require('chai');
const Weapon = require('../model/weapon');
const expect = chai.expect;

chai.use(http);

describe ('Weapon Constructor', function () {
  let newWeapon = new Weapon('Shotty', 'Shotgun');
  it('Should make a new weapon named Shotty', done => {
    expect(newWeapon.name).to.equal('Shotty');
    done();
  });
  it('Should make a new weapon with type Shotgun', done => {
    expect(newWeapon.type).to.equal('Shotgun');
    done();
  });
  it('should have an id of a unique uuid value', done => {
    let pattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
    expect(newWeapon.id).to.match(pattern);
    done();
  });
});
