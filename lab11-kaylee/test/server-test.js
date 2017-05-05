'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('server module', function() {
  before(done => {
    server.listen(3000);
    done();
  });
  after(done => {
    server.close();
    done();
  });

  describe('GET method', function() {
    let getResource;
    before(done => {
      chai.request(server)
      .post('/api/note')
      .send({name: 'Kaylee', date: 'April 15, 2017'})
      .end((err, res) => {
        getResource = JSON.parse(res.text.toString());
        done();
      });
    });
    describe('a properly formatted request', function() {
      it('should return a 200 status code given a valid id', done => {
        chai.request(server)
        .get(`/api/note?id=${getResource.id}`)
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
    describe('an improperly formatted request', function() {
      it('should return a 404 status code given an invalid id', done => {
        chai.request(server)
        .get('/api/note?id=badId')
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
    after(done => {
      chai.request(server)
      .delete('/api/note')
      .query({id: getResource.id})
      .end(() => {
        done();
      });
    });
  });

  describe('POST method', function() {
    describe('a properly formatted request', function() {
      it('should return a 201 status code given a valid body', done => {
        chai.request(server)
        .post(`/api/note`)
        .send({name: 'Kaylee', date: 'April 16, 2017'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(201);
          done();
        });
      });
    });
    describe('an improperly formatted request', function() {
      it('should return a 400 status code if given an invalid body or no body provided', done => {
        chai.request(server)
        .post('/api/note')
        .send()
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('PUT method', function() {
    let putResource;
    before(done => {
      chai.request(server)
      .post('/api/note')
      .send({name: 'Kaylee', date: 'April 17, 2017'})
      .end((err, res) => {
        putResource = JSON.parse(res.text.toString());
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete('/api/note')
      .query({id: putResource.id})
      .end(() => {
        done();
      });
    });
    describe('a properly formatted request', function() {
      it('should return a 202 status code given a valid id', done => {
        chai.request(server)
        .put(`/api/note?id=${putResource.id}`)
        .send({name: 'Kaylee', date: 'April 18, 2017'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(202);
          done();
        });
      });
    });
    describe('an improperly formatted request', function() {
      it('should return a 400 status code if given an invalid body or no body provided', done => {
        chai.request(server)
        .get('/api/note')
        .send({})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('DELETE method', function() {
    let deleteResource;
    before(done => {
      chai.request(server)
      .post('/api/note')
      .send({name: 'Kaylee', date: 'April 20, 2017'})
      .end((err, res) => {
        deleteResource = JSON.parse(res.text.toString());
        done();
      });
    });
    describe('a properly formatted request', function() {
      it('should return a 204 status code given a proper id', done => {
        chai.request(server)
        .delete('/api/note')
        .query({id: deleteResource.id})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(204);
          done();
        });
      });
    });
    describe('an improperly formatted request', function() {
      it('should return a 404 status code given an invalid id', done => {
        chai.request(server)
        .get('/api/note?id=badId')
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
    after(done => {
      chai.request(server)
      .delete('/api/note')
      .query({id: deleteResource.id})
      .end(() => {
        done();
      });
    });
  });
});
