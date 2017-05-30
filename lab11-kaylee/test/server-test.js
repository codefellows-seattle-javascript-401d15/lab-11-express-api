'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('server module', function() {
  let app;
  before(done => {
    app = server.listen(5000);
    done();
  });
  after(done => {
    app.close();
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
      after(done => {
        chai.request(server)
        .delete(`/api/note/${getResource.id}`)
        .end(() => {
          done();
        });
      });
    });
    describe('a properly formatted request', function() {
      it('should return a 200 status code given a valid id', done => {
        chai.request(server)
        .get(`/api/note/${getResource.id}`)
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
        .get('/api/note/badId')
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('POST method', function() {
    describe('a properly formatted request', function() {
      it('should return a 200 status code given a valid body', done => {
        chai.request(server)
        .post(`/api/note`)
        .send({name: 'Kaylee', date: 'April 16, 2017'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
    describe('an improperly formatted request', function() {
      it('should return a 400 status code if given an invalid body or no body provided', done => {
        chai.request(server)
        .post('/api/note')
        .send({})
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
      .delete(`/api/note/${putResource.id}`)
      .end(() => {
        done();
      });
    });
    describe('a properly formatted request', function() {
      it('should return a 200 status code given a valid id', done => {
        chai.request(server)
        .put(`/api/note/${putResource.id}`)
        .send({name: 'Kaylee', date: 'April 18, 2017'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
    describe('an improperly formatted request', function() {
      it('should return a 400 status code if given an invalid body or no body provided', done => {
        chai.request(server)
        .get(`/api/note/${putResource.id}`)
        .send({})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe.only('DELETE method', function() {
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
    after(done => {
      chai.request(server)
      .delete(`/api/note/${deleteResource.id}`)
      .end(() => {
        done();
      });
    });
    describe('a properly formatted request', function() {
      it('should return a 200 status code given a proper id', done => {
        chai.request(server)
        .delete(`/api/note/${deleteResource.id}`)
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
        .delete('/api/note/badId')
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
});
