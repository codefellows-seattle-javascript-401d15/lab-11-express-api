'use strict';
//parse response data

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const expect = chai.expect;

chai.use(http);

let app;

describe('HTTP Server module', function(){
  before(function(done){
    app = server.listen(8000);
    done();
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
        .send({'name': 'apple', 'type': 'red', 'cost': '1.5'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(JSON.parse(res.body).name).to.equal('apple');
          done();
        });
      });

      it('should create food and verify type', done => {
        chai.request(server)
        .post('/api/food')
        .send({'name': 'apple', 'type': 'red', 'cost': '1.5'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(JSON.parse(res.body).type).to.equal('red');
          done();
        });
      });

      it('should create food and verify cost', done => {
        chai.request(server)
        .post('/api/food')
        .send({'name': 'apple', 'type': 'red', 'cost': '1.5'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(JSON.parse(res.body).type).to.equal('red');
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

        it('should respond with 200 on proper request', done => {
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
      let foodTest = [];
      before(done => {
        chai.request(server)
        .post('/api/food')
        .send({'name': 'apple', 'type': 'red', 'cost': 1.5})
        .end((err, res) => {
          let food = JSON.parse(res.body);
          foodTest.push(food);
          done();
        });
      });
      after(done => {
        foodTest.forEach(food => {
          fs.unlinkProm(`${__dirname}/../../data/${food.id}.json`);
        });
        done();
      });

      describe('Verify route status and errors', function () {
        it('should return 200 status on proper request', done => {
          chai.request(server)
          .get(`/api/food/${foodTest[0].id}`)
          .end((err, res) => {
            if (err) console.error(err);
            expect(res.status).to.equal(200);
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

  describe('PUT method', function() {
    let foodTest = [];
    before(done => {
      chai.request(server)
      .post('/api/food')
      .send({'name': 'apple', 'type': 'red', 'cost': 1.5})
      .end((err, res) => {
        let food = JSON.parse(res.body);
        foodTest.push(food);
        done();
      });
    });
    after(done => {
      foodTest.forEach(food => {
        fs.unlinkProm(`${__dirname}/../data/${food.id}.json`);
      });
      done();
    });

    describe('Verify route status and errors', function () {

      it('should change the food name and type', done => {
        chai.request(server)
        .put(`/api/food/${foodTest[0].id}`)
        .send({'name': 'banana', 'type': 'yellow'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(JSON.parse(res.body).name).to.equal('banana');
          done();
        });
      });

      it('should respond with 200 on proper request', done => {
        chai.request(server)
        .put(`/api/food/${foodTest[0].id}`)
        .send({'name': 'banana', 'type': 'yellow'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res).to.have.status(200);
          done();
        });
      });

      it('should respond with 404 if route is not found', done => {
        chai.request(server)
        .put('/api/drinks')
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });

    describe('DELETE method', function() {
      let foodTest = [];
      before(done => {
        chai.request(server)
        .post('/api/food')
        .send({'name': 'apple', 'type': 'red', 'cost': 1.5})
        .end((err, res) => {
          let food = JSON.parse(res.body);
          foodTest.push(food);
          done();
        });
      });
      after(done => {
        foodTest.forEach(food => {
          fs.unlinkProm(`${__dirname}/../../data/${food.id}.json`)
          .then(done)
          .catch(err => console.error(err.message, 'File Deleted in another test'))      .then(done);
        });
      });

      describe('Verify route status and errors', function () {
        it('should respond with 404 if requested file has been deleted', done => {
          chai.request(server)
          .delete(`/api/food/${foodTest[0].id}`)
          .send({})
          .end((err, res) => {
            if (err) console.error(err);
            expect(res.status).to.equal(404);
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
        app.close();
        done();
      });
    });
  });
});
