
'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const Promise = require('bluebird');
const expect = chai.expect;
const DATA_URL = `${__dirname}/../data`;

chai.use(http);

describe('server module', function() {
  let app;
  before(done => {
    app = server.listen(3030);
    done();
  });
  after(done => {
    app.close();
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

    describe('PUT method', function() {
      let ids = [];
      before(done => {
        chai.request(server)
        .post('/api/lure')
        .send({name: 'hello', type: 'rattler', targets: 'trout'})
        .end((err, res) => {
          let lure = JSON.parse(res.text);
          ids.push(lure.id);
          console.log(ids);
          done();
        });
      });
      after(done => {
        ids.forEach(id => {
          fs.unlinkProm(`${DATA_URL}/lure/${id}.json`);
          done();
        });
      });

      describe('requests made to api/lure', function() {
        it('should have response status of 200', done => {
          done();
        });
        it('should have a response status of 404 if given no id', done => {

          done();
        });
        it('should have a respone status of 404 if given bad or no schema', done => {
          done();
        });
        it('should modify a given record if given the correct inputs', done => {
          done();
        });
      });



    });
    describe('requests made to an invalid route');
  });
});
