'use strict';
const app = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;
chai.use(http);

describe('server module', function() {
  let resource;
  let resource2;

  before(done => {
    chai.request(app)
    .post('/api/note')
    .send({owner: 'Light', shinigami: 'Ryuuk', deathCount: 9000})
    .end((err, res) => {
      if(err) console.error(err.message);
      resource = JSON.parse(res.body.toString());
      expect(res.status).to.equal(200);
    }); //close end
    chai.request(app)
    .post('/api/note')
    .send({owner: 'Misa Misa', shinigami: 'Rem', deathCount: 20})
    .end((err, res) => {
      if(err) console.error(err.message);
      resource2 = JSON.parse(res.body.toString());
      expect(res.status).to.equal(200);
      done();
    });
  });

  describe('GET/POST method', function() {
    describe('/api/note route', function() {
      describe('a properly formatted request', function() {
        it('should return a resource given proper id', done => {
          chai.request(app)
          .get(`/api/note`)
          .send({id:`${resource.id}`})
          .end((err, res) => {
            if(err) console.error(err.message);
            let expected = JSON.parse(res.body.toString());
            expect(expected).to.deep.equal(resource);
            done();
          }); // close end
        }); // close it

        it('should return a 200 status code', done => {
          chai.request(app)
          .get(`/api/note`)
          .send({id:`${resource.id}`})
          .end((err, res) => {
            if(err) console.error(err);
            expect(res.status).to.equal(200);
            done();
          }); // close end
        }); //close it

        it('should return an array of all notes when not given an id', done => {
          chai.request(app)
          .get('/api/note')
          .end((err, res) => {
            if(err) console.error(err);
            let expected = JSON.parse(res.body.toString());

            expect(res.status).to.equal(200);
            expect(expected).to.be.a('array');
            expect(expected.length).to.equal(2);
            done();
          }); // close end
        });
      }); // close proper format

      describe('an improperly formatted request', function() {
        it('should return 400/bad request', done => {
          chai.request(app)
          .get('/api/note')
          .send({id:'bob'})
          .end((err, res) => {
            if(err) console.error(err.message);
            expect(res.status).to.equal(400);
            done();
          }); //close end
        }); //close it
      }); //close improp format

      describe('unregistered route', function() {
        it('should write 404 to the response head in router.js', done => {
          chai.request(app)
          .get('/api/not')
          .end((err, res) => {
            if(err) console.error(err.message);
            expect(res.status).to.equal(404);
            done();
          }); //close end
        }); // close it
      }); // close unregistered
    }); // close describe /api/note route
  });// close describe GET method

  describe('PUT method', function() {
    describe('/api/note route', function() {
      it('should update a resource with a 200 status', done => {
        chai.request(app)
        .put(`/api/note`)
        .send({id: `${resource.id}`, owner: 'Misa Misa', shinigami: 'Ryuuk', deathCount: 9001})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        }); // close end
      }); // close it
      it('should retrive the updated note', done => {
        chai.request(app)
        .get('/api/note')
        .send({id:`${resource.id}`})
        .end((err, res) => {
          if(err) console.error(err.message);
          let expected = JSON.parse(res.body.toString());
          expect(expected.owner).to.equal('Misa Misa');
          done();
        });
      });
    }); // close describe route

    describe('bad request', function() {
      it('should respond with 400/bad request', done => {
        chai.request(app)
        .put(`/api/note?id=${resource.id}`)
        .send({owner: 'Misa Misa', shinigami: 'Ryuuk', deathCount: 9001})
        .end((err, res) => {
          if(err) console.error(err.message);
          expect(res.status).to.equal(400);
          expect(err.message).to.include('Bad Request');
          done();
        }); // close end
      }); // close it
    });// close describe bad route
  }); //close put method


  describe('DELETE method', function() {
    describe('/api/note route', function() {
      it('should delete resource with a 200 status', done => {
        chai.request(app)
        .delete('/api/note')
        .send({id:`${resource.id}`})
        .end((err, res) => {
          if(err) console.error('wtfsa' + err.message);
          expect(res.status).to.equal(200);
        }); // close end
        chai.request(app)
        .delete('/api/note')
        .send({id:`${resource2.id}`})
        .end((err, res) => {
          if(err) console.error(err.message);
          expect(res.status).to.equal(200);
        }); // close end
        done();
      }); // close it

      it('should not be able to GET a deleted resource', done => {
        chai.request(app)
        .get('/api/note')
        .send({id:`${resource.id}`})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(400);
        }); // close end
        chai.request(app)
        .get('/api/note')
        .send({id:`${resource2.id}`})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(400);
          done();
        }); // close end
      }); // close it

      it('should delete the sub-directory when not given an id', done => {
        chai.request(app)
        .delete('/api/note')
        .end((err, res) => {
          if(err) console.error(err.message);
          expect(res.status).to.equal(200);
          done();
        }); // close end
      }); // close it
    }); // close describe route
  }); //close delete method
}); // close describe app module
