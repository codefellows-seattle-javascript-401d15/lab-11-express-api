'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('server testing', function() {
  let app;
  before(done => {
    app = server.listen(3000);
    done();
  })

  describe('POST method', function() {
    describe('/api/dragon route', function() {
      it('should return a 200 response', done => {
        chai.request(server)
        .post('/api/dragon')
        .send({name:'Phil', type:'big', killer: true})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        })
      })
    })
  })
  describe('GET method', function() {
    let resource;
    before(done => {
      chai.request(server)
      .post('/api/dragon')
      .send({name: 'Phil', type: 'big', killer: true})
      .end((err, res) => {
        resource = JSON.parse(res.text);
        done();
      })
    })
    after(done => {
      chai.request(server)
      .delete(`/api/dragon/${resource.id}`)
      .end(() => {
        done();
      })
    })
    describe('/api/dragon route', function() {
      describe('properly formatted request', function() {
        it('should return a resource given proper id', done => {
          chai.request(server)
          .get(`/api/dragon?id=${resource.id}`)
          .end((err, res) => {
            expect(res.status).to.equal(200)
            done();
          })
        })
      })
    })
    describe('improperly formatted request', function() {
      it('should return an error response 400', done => {
        chai.request(server)
        .get(`/api/dragon?foo=${resource.id}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        })
      })
    })
  })
  describe('unregistered route', function() {
    it('should respond with 404 for an id not found', done => {
      chai.request(server)
      .get('/api/dragon?id=fakeid')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      })
    })
  })
  describe('PUT method', function() {
    describe('/api/dragon route', function() {
      let resource;
      before(done => {
        chai.request(server)
        .post('/api/dragon')
        .send({name:'Phil', type:'big', killer: true})
        .end((err, res) => {
          resource = JSON.parse(res.text);
          done();
        });
      });
      it('should have new info', done => {
        chai.request(server)
        .put(`/api/dragon/${resource.id}`)
        .send({name:'Fredrick'})
        .end((err, res) => {
          expect(res.body.name).to.equal('Fredrick')
          done()
        })
      })
      after(done => {
        chai.request(server)
        .delete(`/api/dragon/${resource.id}`)
        .end(() => {
          console.error();
          done();
        })
      })
    })
  })
  describe('DELETE method', function() {
    describe('/api/dragon route', function() {
      let resource;
      before(done => {
        chai.request(server)
        .post('/api/dragon')
        .send({name:'Phil', type:'big', killer: true})
        .end((err, res) => {
          resource = JSON.parse(res.text);
          done();
        });
      });
      it('should delete dragon', done => {
        chai.request(server)
        .delete(`/api/dragon/${resource.id}`)
        .end((err, res) => {
          expect(res).to.have.status(200)
          done();
        });
      });
    });
  });

  after(done => {
    app.close();
    done();
  });
})
