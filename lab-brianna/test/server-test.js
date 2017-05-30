'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

describe('GET method', function() {
  let resource;
  before(done => {
    chai.request(server)
    .post('/api/watch')
    .send({brand: 'test', color: 'test', size: 'test'})
    .end((err, res) => {
      resource = JSON.parse(res.text.toString());
      done();
    });
  });
  after(done => {
    chai.request(server)
    .delete(`/api/watch?id=${resource.id}`)
    .query({id:resource.id});
    end((err, res) => {
      done();
    });
  });
  describe('/api/watch route', function() {
    describe('a properly formatted request', function() {
      it('should return a resource proper id', done => {
        chai.request(server)
        .get('/api/');
      });
    });
  });
});

describe('POST method', function() {

});

describe('PUT method', function() {

});

describe('DELETE method', function() {

});
