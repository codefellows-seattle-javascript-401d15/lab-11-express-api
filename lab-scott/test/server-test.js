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

  });

  describe('GET', function(){

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
        console.log(planets);
        done();
      });
    });
    after(done => {
      planets.forEach(id => {
        fs.unlinkProm(`${__dirname}/../data/note/${id}.json`);
      });
      done();
    });
    describe('request made to /api/planet', function(){
      it('should have a respoonse status of 200', done =>{
        console.log(`/api/planet${planets[0].id}`);
        chai.request(server)
          .put(`/api/planet/${planets[0].id}`)
          .send({name:planets[0].name, universe:planets[0].universe})
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
      it('should respond with 404 given no id', done => {
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
            expect(res).to.have.status();
            done();
          });
      });
    });
  });

  describe('DELETE', function(){

  });
});
