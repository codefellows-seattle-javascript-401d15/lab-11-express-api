'use strict';

const http = require('chai-http');
const chai = require('chai');
const server = require('../server');
const expect = chai.expect;

chai.use(http);

describe('Server function check', function() {
  before(done => {
    server.listen(3000);
    done();
  });

  describe('POST method', function() {
    describe('/api/candy endpoint', function() {
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .post('/wrong')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
      it('should return a candy', (done) => {
        chai.request(server)
        .post('/api/candy')
        .send({name: 'twix', type: 'bar', texture: 'chewy'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res).to.have.status(200);
          done();
        });
      });
    });
  });

  describe('GET method', function() {
    let resource;
    before(done => {
      chai.request(server)
      .post('/api/candy')
      .send({name: 'butterfinger', type: 'bar', texture: 'crunchy'})
      .end((err, res) => {
        resource = JSON.parse(res.text.toString());
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete('/api/candy')
      .query({id: resource.id})
      .end(() => {
        console.error();
        done();
      });
    });
    describe('/api/candy endpoint', function() {
      describe('A properly formatted request', function() {
        it('should return a resource given proper id', done => {
          chai.request(server)
          .get(`/api/candy?id=${resource.id}`)
          .end((err, res) => {
            let expected = JSON.parse(res.text.toString());
            expect(resource).to.deep.equal(expected);
            done();
          });
        });
        describe('An incorrectly formatted request', function() {
          it('should return an error', done => {
            chai.request(server)
            .get('/api/candy/id')
            .end((err, res) => {
              if(err) throw err;
              expect(res).to.have(err);
            });
            done();
          });
          it('should respond with a 400 on bad request', done => {
            chai.request(server)
            .post('/wrong')
            .send({})
            .end((err, res) => {
              expect(res.status).to.equal(400);
            });
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
      .post('/api/candy')
      .send({name: 'york', type: 'mint', texture: 'creamy'})
      .end((err, res) => {
        resource = JSON.parse(res.text.toString());
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete('/api/candy')
      .query({id: resource.id})
      .end(() => {
        console.error();
        done();
      });
    });
    describe('/api/candy endpoint', function() {
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .post('/wrong')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
      it('should respond with a 201 on proper request', done => {
        chai.request(server)
        .get(`/api/candy?id=${resource.id}`)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
      });
    });
  });
  describe('UPDATE method', function () {
    let resource;
    before(done => {
      chai.request(server)
     .post('/api/candy')
     .send({name: 'york', type: 'mint', texture: 'creamy'})
     .end((err, res) => {
       resource = JSON.parse(res.text.toString());
       done();
     });
   });
   after(done => {
     chai.request(server)
     .delete('/api/candy')
     .query({id: resource.id})
     .end(() => {
       console.error();
       done();
     });
   });
   describe('/api/candy update endpoint', function () {
     it('should respond with a 400 on bad request', done => {
       chai.request(server)
       .post('/wrong')
       .send({})
       .end((err, res) => {
         expect(res.status).to.equal(400);
         done();
       });
     });
     it('should respond with a 201 on proper request', done => {
       chai.request(server)
       .get(`/api/candy?id=${resource.id}`)
       .send({})
       .end((err, res) => {
         expect(res.status).to.equal(201);
         done();
       });
     });
   });
  });
  after(done => {
    server.close();
    done();
  });
});
