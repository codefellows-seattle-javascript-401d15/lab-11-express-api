'use strict';

const chai = require('chai');
const expect = chai.expect;
const server = require('../server.js');
const http = require('chai-http');

chai.use(http);

describe('Server module', function() {
  let app;
  before(done => {
    app = server.listen(8080);
    done();
  });

  describe('POST method', function() {
    describe('/api/consoles endpoint', function() {
      it('should respond with 201 on proper request', done => {
        chai.request(server)
        .post('/api/consoles')
        .send({
          name: 'Wii',
          manufacturer: 'Nintendo',
          releaseYear: 2006,
        })
        .end((err, res) => {
          if(err) console.error(err);
          let hardware = JSON.parse(res.text);
          this.result = hardware;
          expect(res).status(200);
          expect(hardware.name).to.equal('Wii');
          done();
        });
      });

      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .post('/api/consoles')
        .send({})
        .end((err, res) => {
          expect(res).status(400);
          done();
        });
      });

      after(done => {
        chai.request(server)
        .delete(`/api/consoles/${this.result.id}`)
        .end(() => {
          done();
        });
      });
    });
  });

  describe('GET method', function() {
    describe('/api/consoles', function() {
      before(done => {
        chai.request(server)
        .post('/api/consoles')
        .send({
          name: 'N64',
          manufacturer: 'Nintendo',
          releaseYear: 1992,
        })
        .end((err, res) => {
          this.result = JSON.parse(res.text);
          done();
        });
      });

      it('should respond with a status of 200 on proper request', done => {
        chai.request(server)
        .get(`/api/consoles/${this.result.id}`)
        .end((err, res) => {
          expect(res).status(200);
          done();
        });
      });

      it('should respond with a status of 404 for a valid request with an invalid id', done => {
        chai.request(server)
        .get('/api/consoles/')
        .end((err, res) => {
          expect(res).status(404);
          expect(res.notFound).to.be.true;
          done();
        });
      });

      after(done => {
        chai.request(server)
        .delete(`/api/consoles/${this.result.id}`)
        .end(() => {
          done();
        });
      });
    });
  });

  describe('PUT method', function() {
    describe('/api/consoles', function() {
      before(done => {
        chai.request(server)
        .post('/api/consoles')
        .send({
          name: 'Dolphin',
          manufacturer: 'Nintendo',
          releaseYear: 2000,
        })
        .end((err, res) => {
          this.result = JSON.parse(res.text);
          done();
        });
      });

      it('should respond with a status of 202 on proper request', done => {
        chai.request(server)
        .put(`/api/consoles/${this.result.id}`)
        .send({
          name: 'GameCube',
          manufacturer: 'Nintendo',
          releaseDate: 2001,
        })
        .end((err, res) => {
          expect(res).status(200);
          done();
        });
      });

      it('should respond with a status of 400 on a bad request', done => {
        chai.request(server)
        .put('/api/consoles/this.resu')

        .end((err, res) => {
          expect(res).status(400);
          expect(res.text).to.equal('bad request');
          done();
        });
      });

      after(done => {
        chai.request(server)
        .delete(`/api/consoles/${this.result.id}`)
        .end(() => {
          done();
        });
      });
    });
  });

  describe('DELETE method', function() {
    describe('/api/consoles', function() {
      before(done => {
        chai.request(server)
        .post('/api/consoles')
        .send({
          name: 'VirtualBoy',
          manufacturer: 'Nintendo',
          releaseYear: 1988,
        })
        .end((err, res) => {
          this.result = JSON.parse(res.text);
          done();
        });
      });

      it('should respond with a 204 on proper request', done => {
        chai.request(server)
        .delete(`/api/consoles/${this.result.id}`)
        .end((err, res) => {
          expect(res).status(200);
          done();
        });
      });
      
      it('should respond with a 404 when an invalid id is used', done => {
        chai.request(server)
        .delete('/api/consoles/')
        .end((err, res) => {
          expect(res).status(404);
          expect(res.notFound).to.be.true;
          done();
        });
      });
    });
  });

  after(done => {
    app.close();
    done();
  });
});
