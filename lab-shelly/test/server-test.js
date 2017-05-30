'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('Server module', function () {
  let app;
  before(done => {
    app = server.listen(8000);
    done();
  });

  after(done => {
    app.close();
    done();
  });

  describe('POST method', function() {
    describe('a properly formatted request', function() {
      it('should return a 200 response' , (done) => {
        chai.request(server)
        .post('/api/cat')
        .send({name: 'milo', mood: 'happy'})
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
      });
      it('should return a response object', (done) => {
        chai.request(server)
        .post('/api/cat')
        .send({name: 'milo', mood: 'happy'})
        .end((err, res) => {
          expect(res).to.be.an('object');
          done();
        });
      });
    });
    describe('a request with no body provided or invalid body', function() {
      it('should return a 400 error response', (done) => {
        chai.request(server)
        .post('/api/cat')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
      });
    });
    describe('an unregistered route', function() {
      it('should return a 404 error ', (done) => {
        chai.request(server)
        .get('/api/dog')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
      });
    });
  });

  describe('GET method', function() {
    let resource;
    before(done => {
      chai.request(server)
      .post('/api/cat')
      .send({name: 'binky', mood: 'grumpy'})
      .end((err, res) => {
        resource = JSON.parse(res.body);
        done();
      });
    });

    after(done => {
      chai.request(server)
      .delete('api/cat')
      .query({id: resource.id})
      .end(() => {
        console.error();
        done();
      });
    });
    describe('/api/cat route', function() {

      describe('a request for an id that does not exist', function() {
        it('should return an error response 404 of "not found"', (done) => {
          chai.request(server)
          .get(`/api/cat/${resource.id}/124`)
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
        });
      });
      describe('a properly formatted request with valid id', function() {
        it('should return a 200 response', done => {
          chai.request(server)
          .get(`/api/cat/${resource.id}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
        });
        it('should return a response body object', done => {
          chai.request(server)
          .get(`/api/cat/${resource.id}`)
          .end((err, res) => {
            expect(res).to.be.an('object');
            done();
          });
        });
      });
      describe('unregistered route', function() {
        it('should respond with 404 for an id not found', done => {
          chai.request(server)
          .get('/api/dog')
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
        });
      });
    });
  });
  describe('PUT method', function() {
    let resource;
    before(done => {
      chai.request(server)
      .post('/api/cat')
      .send({name: 'eva', mood: 'grumpy'})
      .end((err, res) => {
        resource = JSON.parse(res.body);
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete('/api/cat')
      .query({id: resource.id})
      .end(() => {
        console.error();
        done();
      });
    });

    describe('/api/cat route', function() {
      describe('a properly formatted request', function() {
        it('should return a 200 response', done => {
          chai.request(server)
          .put(`/api/cat/${resource.id}`)
          .send({name: 'mia', mood: 'happy'})
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
        });
        it('should return a response body object', done => {
          chai.request(server)
          .put(`/api/cat/${resource.id}`)
          .send({name: 'mia', mood: 'happy'})
          .end((err, res) => {
            expect(res).to.be.an('object');
            done();
          });
        });
      });

      describe('an improperly formatted request', function() {
        it('should return an error response 400 of "not found"', done => {
          chai.request(server)
          .put(`/api/cat/${resource.id}`)
          .send({})
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
        });
      });

      describe('unregistered route', function() {
        it('should return a 404 for unregistered route', done => {
          chai.request(server)
          .put('/api/dog')
          .send({name: 'mia', mood: 'happy'})
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
        });
      });
    });
  });

  describe('DELETE method', function() {
    let resource;
    before(done => {
      chai.request(server)
      .post('/api/cat')
      .send({name: 'eva', mood: 'grumpy'})
      .end((err, res) => {
        resource = JSON.parse(res.text);
        done();
      });
    });

    after(done => {
      chai.request(server)
      .delete('/api/cat')
      .query({id: resource.id})
      .end(() => {
        console.error();
        done();
      });
    });

    describe('/api/cat route', function() {

      describe('a response with a valid id', function() {
        it('should return a 204 response', done => {
          resource = JSON.parse(resource);
          chai.request(server)
          .delete(`/api/cat/${resource.id}`)
          .end((err, res) => {
            expect(res).to.have.status(204);
            done();
          });
        });
      });
      describe('an unregistered request', function() {
        it('should return a 404 request', done => {
          chai.request(server)
          .delete('/api/dog')
          .query({id: resource.id})
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
        });
      });
      describe('a request with an improper id', function() {
        it('should return a 404 response', done => {
          chai.request(server)
          .delete('/api/cat')
          .query({id: '123455'})
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
        });
      });
    });
  });
});
