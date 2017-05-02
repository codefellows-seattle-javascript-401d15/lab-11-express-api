'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('Server - Test', () => {
  // before(done => {
  //   server.listen(3000);
  //   done();
  // });

  describe('POST method', () => {
    describe('/api/song endpoint', () => {
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .post('/api/song')
        .send({title: 'test-title', artist: 'test-artist', album: 'test-album'})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          console.log(`Actual status: ${res.status}`);
          done();
        });
      });
    });

    describe('/wrong endpoint', () => {
      it('should respond with a 404 on bad request', done => {
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {
          expect(res.status).to.deep.equal(404);
          console.log(`Actual status: ${res.status}`);
          done();
        });
      });
    });
  });

  describe('GET method', () => {

    describe('/api/song?id endpoint', () => {
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .get('/api/song?id=keep0dc4daa5-37d6-4a23-9bd3-8ea0af20045a')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          console.log(`Actual status: ${res.status}`);
          done();
        });
      });
    });

    describe('/wrong endpoint', () => {
      it('should respond with a 404 on bad request', done => {
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {
          expect(res.status).to.deep.equal(404);
          console.log(`Actual status: ${res.status}`);
          done();
        });
      });
    });
  });

  // after(done => {
  //   server.close();
  //   done();
  // });
});
