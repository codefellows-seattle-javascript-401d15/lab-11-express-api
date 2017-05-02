'use strict';

const server = require('../server.js');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('Server module', function() {
  describe('POST method', function() {
    describe('/api/pokemon endpoint', function() {
      it.only('Should respond with status 201 on a proper request', done => {
        chai.request(server)
        .post('/api/pokemon')
        .send({name: 'pikachu', type: 'electric'})
        .end((err, res) => {
          if (err) throw err;
          expect(res.status).to.equal(201);
          done();
        });
      });
      it('Should respond with status 400 on a bad request', done => {
        console.log('inside the it block');
        chai.request(server)
        .post('/api/pokemon')
        .send({name: 'pikachu'})
        .end((err, res) => {
          console.error('this is the error', err);
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('GET method', function() {
    describe('/api/pokemon/:id endpoint', function() {
      it('Should respond with status 200 on a proper request', done => {
        chai.request(server)
        .get('/api/pokemon/')
        .send({name: 'pikachu', type: 'electric'})
        .end((err, res) => {
          if (err) throw err;
          expect(res.status).to.equal(200);
          done();
        });
      });
      it('Should respond with status 404 not found', done => {
        chai.request(server)
        .get('/wrong')
        .send({name: 'pikachu', type: 'electric'})
        .end((err, res) => {
          if (err) throw err;
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('PUT method', function() {
    describe('/api/pokemon endpoint', function() {
      it('Should respond with status 202 on a proper request', done => {
        chai.request(server)
        .get('/api/pokemon')
        .send({name: 'pikachu', type: 'electric'})
        .end((err, res) => {
          if (err) throw err;
          expect(res.status).to.equal(202);
          done();
        });
      });
      it('Should respond with status 400 on a bad request', done => {
        chai.request(server)
        .get('/wrong')
        .send({name: 'pikachu', type: 'electric'})
        .end((err, res) => {
          if (err) throw err;
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('DELETE method', function() {
    describe('/api/pokemon endpoint', function() {
      it('Should respond with status 204 on a proper request', done => {
        chai.request(server)
        .get('/api/pokemon')
        .send({name: 'pikachu', type: 'electric'})
        .end((err, res) => {
          if (err) throw err;
          expect(res.status).to.equal(204);
          done();
        });
      });
      it('Should respond with status 404 on a bad request', done => {
        chai.request(server)
        .get('/wrong')
        .send({name: 'pikachu', type: 'electric'})
        .end((err, res) => {
          if (err) throw err;
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
});
