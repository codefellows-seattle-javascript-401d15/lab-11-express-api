'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

chai.use(http);

describe('server module', function(){
  let app;
  before(done => {
    app = server.listen(7357);
    done();
  });

  after(done => {
    app.close();
    done();
  });

  describe('POST', function(){
    let testPlanet;
    before(done => {
      chai.request(server)
        .post('/api/planet')
        .send({name: 'Hoth', universe: 'starwars'})
        .end((err, res) => {
          testPlanet = JSON.parse(res.body);
          done();
        });
    });
    after(done => {
      fs.unlinkProm(`${__dirname}/../data/planet/${testPlanet.id}.json`);
      done();
    });
    describe('request made to /api/planet', function(){
      it('should have a respoonse status of 200', done =>{
        chai.request(server)
          .post('/api/planet')
          .send({name: testPlanet.name, universe: testPlanet.universe})
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
      it('should respond with 400 if not given all inputs', done => {
        chai.request(server)
          .post('/api/planet')
          .send({name: 'Hoth'})
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('should create a specific record given the correct inputs', done => {
        chai.request(server)
          .post('/api/planet')
          .send({name: testPlanet.name, universe: testPlanet.universe})
          .end((err, res) => {
            let postedP= JSON.parse(res.body);
            expect(postedP.name).to.equal('Hoth');
            done();
          });
      });
    });
  });

  describe('GET', function(){
    let testPlanet;
    before(done => {
      chai.request(server)
        .post('/api/planet')
        .send({name: 'Hoth', universe: 'starwars'})
        .end((err, res) => {
          testPlanet = JSON.parse(res.body);
          done();
        });
    });
    after(done => {
      fs.unlinkProm(`${__dirname}/../data/planet/${testPlanet.id}.json`);
      done();
    });
    describe('request made to /api/planet', function(){
      it('should have a respoonse status of 200', done =>{
        chai.request(server)
          .get(`/api/planet/${testPlanet.id}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
      it('should respond with 404 if not found', done => {
        chai.request(server)
          .get('/api/planet')
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
      });
      it('should create a specific record given the correct inputs', done => {
        chai.request(server)
          .get(`/api/planet/${testPlanet.id}`)
          .end((err, res) => {
            let gotP= JSON.parse(res.body);
            expect(gotP.name).to.equal('Hoth');
            done();
          });
      });
    });
  });

  describe('PUT', function(){
    let planets = [];
    before(done => {
      chai.request(server)
      .post('/api/planet')
      .send({name: 'Hoth', universe: 'starwars'})
      .end((err, res) => {
        let planet = JSON.parse(res.body);
        planets.push(planet);
        // console.log(planets);
        done();
      });
    });
    after(done => {
      planets.forEach(() => {
        fs.unlinkProm(`${__dirname}/../data/planet/${planets[0].id}.json`);
      });
      done();
    });
    describe('request made to /api/planet', function(){
      it('should have a respoonse status of 200', done =>{
        // console.log(`/api/planet${planets[0].id}`);
        chai.request(server)
          .put(`/api/planet/${planets[0].id}`)
          .send({name:planets[0].name, universe:planets[0].universe})
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
      it('should respond with 404 if not found', done => {
        chai.request(server)
          .put('/api/planet')
          .send({name:planets[0].name, universe:planets[0].universe})
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
      });
      it('should modify a specific record given the correct inputs', done => {
        chai.request(server)
          .put(`/api/planet/${planets[0].id}`)
          .send({name:planets[0].name, universe:planets[0].universe})
          .end((err, res) => {
            let updatedP= JSON.parse(res.body);
            expect(updatedP.name).to.equal(planets[0].name);
            done();
          });
      });
    });
  });

  describe('DELETE', function(){
    let testPlanet;
    before(done => {
      chai.request(server)
        .post('/api/planet')
        .send({name: 'Hoth', universe: 'starwars'})
        .end((err, res) => {
          testPlanet = JSON.parse(res.body);
          done();
        });
    });

    describe('request made to /api/planet', function(){
      it('should have a respoonse status of 200', done =>{
        chai.request(server)
          .delete(`/api/planet/${testPlanet.id}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
      it('should respond with 404 if not found', done => {
        chai.request(server)
          .get('/api/planet')
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
      });
    });
  });
});
