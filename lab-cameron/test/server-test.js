'use strict';

const server = require('../server.js');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

const DATA_URL = `${__dirname}/../data`;

chai.use(http);

describe('Server module', function() {
  let app;
  before(done => {
    app = server.listen(6660);
    done();
  });
  after(done => {
    app.close();
    done();
  });
  describe('#POST', function() {
    let pokemons = [];
    after(done => {
      pokemons.forEach(ele => {
        ele = JSON.parse(ele);
        fs.unlinkProm(`${DATA_URL}/pokemon/${ele.id}.json`);
      });
      done();
    });
    describe('/api/pokemon', function() {
      it('Should respond with status 200 on a proper request', done => {
        chai.request(server)
        .post('/api/pokemon')
        .send({name: 'bulbasaur', type: 'grass'})
        .end((err, res) => {
          let pokemon = JSON.parse(res.text.toString());
          pokemons.push(pokemon);
          expect(res).to.have.status(200);
          done();
        });
      });
      it('Should respond with status 400 on a bad request', done => {
        chai.request(server)
        .post('/api/pokemon')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
      });
    });
  });

  describe('#GET', function() {
    let pokemons = [];
    before(done => {
      chai.request(server)
      .post('/api/pokemon')
      .send({name: 'charmander', type: 'fire'})
      .end((err, res) => {
        let pokemon = JSON.parse(res.text.toString());
        pokemons.push(pokemon);
        done();
      });
    });
    after(done => {
      pokemons.forEach(ele => {
        ele = JSON.parse(ele);
        fs.unlinkProm(`${DATA_URL}/pokemon/${ele.id}.json`);
      });
      done();
    });
    describe('/api/pokemon/:id', function() {
      it('Should respond with status 200 on a proper request', done => {
        let testmon = JSON.parse(pokemons[0]);
        chai.request(server)
        .get(`/api/pokemon/${testmon.id}`)
        .send()
        .end((err, res) => {
          console.log(testmon);
          expect(res).to.have.status(200);
          done();
        });
      });
      it('Should respond with status 404 if no id provided', done => {
        chai.request(server)
        .get('/api/pokemon')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
      });
      it('Should respond with status 400 on a bad request', done => {
        chai.request(server)
        .get(`/api/pokemon/1234`)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
      });
    });
  });

  describe('#PUT', function() {
    let pokemons = [];
    before(done => {
      chai.request(server)
      .post('/api/pokemon')
      .send({name: 'charmander', type: 'fire'})
      .end((err, res) => {
        let pokemon = JSON.parse(res.text.toString());
        pokemons.push(pokemon);
        done();
      });
    });
    after(done => {
      pokemons.forEach(ele => {
        ele = JSON.parse(ele);
        fs.unlinkProm(`${DATA_URL}/pokemon/${ele.id}.json`);
      });
      done();
    });
    describe('requests made to /api/pokemon/:id', function() {
      it('Should respond with status 200', done => {
        let testmon = JSON.parse(pokemons[0]);
        chai.request(server)
        .put(`/api/pokemon/${testmon.id}`)
        .send({name: 'charmeleon'})
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
      });
      it('Should respond with status 404 given no id', done => {
        chai.request(server)
        .put(`/api/pokemon/1234`)
        .send({name: 'charmeleon'})
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
      });
      it('modify a specific record given the correct inputs', done => {
        let testmon = JSON.parse(pokemons[0]);
        chai.request(server)
        .put(`/api/pokemon/${testmon.id}`)
        .send({name: 'charmeleon'})
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
      });
      it('Should respond with status 404 given bad inputs', done => {
        let testmon = JSON.parse(pokemons[0]);
        chai.request(server)
        .put(`/api/pokemon/${testmon.id}`)
        .send({attack: 40}) // attack isn't a property which exists on the Pokemon model
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
      });
    });
  });

  describe('#DELETE', function() {
    let pokemons = [];
    before(done => {
      chai.request(server)
      .post('/api/pokemon')
      .send({name: 'charmander', type: 'fire'})
      .end((err, res) => {
        let pokemon = JSON.parse(res.text.toString());
        pokemons.push(pokemon);
        done();
      });
    });
    // after(done => {
    //   pokemons.forEach(ele => {
    //     ele = JSON.parse(ele);
    //     fs.unlinkProm(`${DATA_URL}/pokemon/${ele.id}.json`);
    //   });
    //   done();
    // });
    describe('requests made to /api/pokemon/:id', function() {
      it('Should respond with status 204 on a proper request', done => {
        let testmon = JSON.parse(pokemons[0]);
        chai.request(server)
        .delete(`/api/pokemon/${testmon.id}`)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
      });
      it('Should respond with status 404 for proper request with invalid id', done => {
        chai.request(server)
        .delete('/api/pokemon/1234')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
      });
    });
  });
});
