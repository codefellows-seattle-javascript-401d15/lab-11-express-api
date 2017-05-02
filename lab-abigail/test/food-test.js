'use strict';

const server = require('../server');
const chai = require('chai');
const expect = chai.expect;
const http = require('chai-http');

chai.use(http);

describe('HTTP Server module', function(){
  before(function(done){
    server.listen(3000);
    done();
  });
});

describe('ensure that api returns a status code of 404 for routes that have not been registered', function() {
  it('should respond with a 404 on an invalid route', function(done) {
    chai.request(server)
    .get('/api/drinks')
    .end((err, res) => {
      expect(res).to.have.status(404);
      done();
    });
  });
});

describe('POST method', function() {
  describe('Verify item created', function() {
    it('should create food and verify name', done => {
      chai.request(server)
      .post('/api/food')
      .send({'name': 'apple', 'type': 'red', 'cost': 1.5})
      .end((err, res) => {
        if (err) console.error(err);
        expect(res.body.name).to.equal('apple');
        done();
      });
    });

    it('should create food and verify type', done => {
      chai.request(server)
      .post('/api/food')
      .send({'name': 'apple', 'type': 'red', 'cost': 1.5})
      .end((err, res) => {
        if (err) console.error(err);
        expect(res.body.type).to.equal('red');
        done();
      });
    });

    it('should create food and verify cost', done => {
      chai.request(server)
      .post('/api/food')
      .send({'name': 'apple', 'type': 'red', 'cost': 1.5})
      .end((err, res) => {
        if (err) console.error(err);
        expect(res.body.cost).to.equal(1.5);
        done();
      });
    });

    it('should be an object', done => {
      chai.request(server)
      .post('/api/food')
      .send({'name': 'apple', 'type': 'red', 'cost': 1.5})
      .end((err, res) => {
        if (err) console.error(err);
        expect(res).to.be.a('object');
        done();
      });
    });

    describe('Verify route status and errors', function () {
      it('should respond with 404 if route is not found', done => {
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });

      it('should respond with 201 on proper request', done => {
        chai.request(server)
        .post('/api/food')
        .send({'name': 'apple', 'type': 'red', 'cost': 1.5})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
  });

  describe('GET method', function() {
    let food;
    before(done => {
      chai.request(server)
      .post('/api/food')
      .send({'name': 'apple', 'type': 'red', 'cost': 1.5})
      .end((err, res) => {
        food = JSON.parse(res.text.toString());
      });
      done();
    });

    describe('Verify route status and errors', function () {
      it('should return 200 status on proper request', done => {
        chai.request(server)
        .get(`/api/food?id=${food.id}`)
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(201);
          done();
        });
      });

      it('should respond with 404 status if route is not found', done => {
        chai.request(server)
        .get('/api/drinks')
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });

      it('should return an object', done => {
        chai.request(server)
        .get('/api/drinks')
        .end((err, res) => {
          if (err) console.error(err);
          expect(res).to.be.an('object');
          done();
        });
      });
    });
  });
});

describe('PUT method', function() {
  let food;
  before(done => {
    chai.request(server)
    .post('/api/food')
    .send({'name': 'apple', 'type': 'red', 'cost': 1.5})
    .end((err, res) => {
      food = JSON.parse(res.text.toString());
    });
    done();
  });

  describe('Verify route status and errors', function () {

    it('should change the food name and type', done => {
      chai.request(server)
      .post('/api/food')
      .send({'name': 'banana', 'type': 'yellow'})
      .end((err, res) => {
        if (err) console.error(err);
        expect(res.body.name).to.equal('banana');
        done();
      });

      it('should respond with 202 on proper request', done => {
        chai.request(server)
        .put(`/api/food?id=${food.id}`)
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });

      it('should respond with 400 if route is not found', done => {
        chai.request(server)
        .put('/api/drinks')
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });
});

describe('DELETE method', function() {
  let food;
  before(done => {
    chai.request(server)
    .post('/api/food')
    .send({'name': 'apple', 'type': 'red', 'cost': 1.5})
    .end((err, res) => {
      food = JSON.parse(res.text.toString());
    });
    done();
  });

  describe('Verify route status and errors', function () {
    it('should respond with 204 on proper request', done => {
      chai.request(server)
      .delete(`/api/food?id=${food.id}`)
      .end((err, res) => {
        if (err) console.error(err);
        expect(res.status).to.equal(204);
        done();
      });
    });

    it('should respond with 404 if route is not found', done => {
      chai.request(server)
      .delete('/api/drinks')
      .end((err, res) => {
        if (err) console.error(err);
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
});

describe('HTTP Server module', function(){
  after(function(done){
    server.end();
    done();
  });
});
