
'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;
const app = ('express');

chai.use(http);
// app.use(router);

describe('server module', function() {
  before(done => {
    app.listen(3000);
    done();
  });
  after(done => {
    server.close();
    done();
  });
});

describe('GET method', function() {
  let resource;
  before(done => {
    chai.request(server)
    .post('/api/lure')
    .send({name: 'momba', type: 'rattler', targets: 'trout'})
    .end((err, res) => {
      resource = JSON.parse(res.text.toString());
      done();
    });
  });
  after(done => {
    chai.request(server)
    .delete('/api/lure')
    .query({id: resource.id})
    .end((err, res) => {
      console.log(res);
      done();
    });
  });

  describe('api/lure route', function() {
    describe('a properly formatted request', function() {
      it('should return a resource given proper id', done => {
        chai.request(server)
        .get('/api/lure?id=${resource.id}')
        .end((err, res) => {
          let expected = JSON.parse(res.text.toString());
          expect(resource).to.deep.equal(expected);
          expect(res).to.have.status(200);
          done();
        });
      });
    });
    describe('an improperly formatted request', function() {
      it('should return 400, bad request', done => {
        chai.request(server)
        .get('/api/lure?id=${}')
        .end((err, res) => {
          let expected = JSON.parse(res.text.toString());
          expect(resource).to.deep.equal(expected);
          expect(res).to.have.status(400);
          done();
        });
      });
    });
    describe('an unregistered route', function() {
      it('should return 404, not found', done => {
        chai.request(server)
        .get('/api/lure?id=${resource.id}')
        .end((err, res) => {
          let expected = JSON.parse(res.text.toString());
          expect(resource).to.deep.equal(expected);
          expect(res).to.have.status(404);
          done();
        });
      });
    });
  });
  // describe('POST method', function() {
  //
  // });
  //
  // describe('PUT method', function() {
  //
  //
  //
  //
  // });
  //
  // describe('DELETE method', function() {
  //
  //
  //
  //
  // });
});
