
'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const expect = chai.expect;
const DATA_URL = `${__dirname}/../data`;

const sampleLure = { name: 'momba', type: 'rattler', targets: 'trout', water: 'fresh' };

chai.use(http);

describe('server module', function() {
  let lures = [];

  describe('#POST method', function() {

    after(done => {
      lures.forEach(lure => {
        fs.unlinkProm(`${DATA_URL}/lure/${lure.id}.json`);
      });
      done();
    });
    describe('create a lure record', function() {
      it('should get a 200 response', done => {
        chai.request(server)
        .post('/api/lure')
        .send({ name: 'momba', type: 'rattler', targets: 'trout', water: 'fresh' })
        .end((err, res) => {
          let lure = JSON.parse(res.text);
          lures.push(lure);
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });

      it('should get a 404 response if requesting a bad route', done => {
        chai.request(server)
        .post('/api/boogers')
        .send({ name: 'momba', type: 'rattler', targets: 'trout', water: 'fresh' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });

      it('should make a record with a string for a name, momba', done => {
        chai.request(server)
        .post('/api/lure')
        .send({ name: 'momba', type: 'rattler', targets: 'trout', water: 'fresh' })
        .end((err, res) => {
          let lure = JSON.parse(res.text);
          lures.push(lure);
          if (err) console.error(err);
          expect(JSON.parse(res.text)).to.be.an('object')
          .that.has.property('name')
          .that.equals(sampleLure.name);
          done();
        });
      });

      it('should make a record with a string for type, rattler', done => {
        chai.request(server)
        .post('/api/lure')
        .send({ name: 'momba', type: 'rattler', targets: 'trout', water: 'fresh' })
        .end((err, res) => {
          let lure = JSON.parse(res.text);
          lures.push(lure);
          if (err) console.error(err);
          expect(JSON.parse(res.text)).to.be.an('object')
          .that.has.property('type')
          .that.equals(sampleLure.type);
          done();
        });
      });

      it('should make a record with a string for targets, trout', done => {
        chai.request(server)
        .post('/api/lure')
        .send({ name: 'momba', type: 'rattler', targets: 'trout', water: 'fresh' })
        .end((err, res) => {
          let lure = JSON.parse(res.text);
          lures.push(lure);
          if (err) console.error(err);
          expect(JSON.parse(res.text)).to.be.an('object')
          .that.has.property('targets')
          .that.equals(sampleLure.targets);
          done();
        });
      });

      it('should make a record with a string for water, fresh', done => {
        chai.request(server)
        .post('/api/lure')
        .send({ name: 'momba', type: 'rattler', targets: 'trout' })
        .end((err, res) => {
          let lure = JSON.parse(res.text);
          lures.push(lure);
          if (err) console.error(err);
          expect(JSON.parse(res.text)).to.be.an('object')
          .that.has.property('water')
          .that.equals(sampleLure.water);
          done();
        });
      });
    });
  });

  describe.only('PUT method', function() {
    before(done => {
      chai.request(server)
      .post('/api/lure')
      .send({name: 'test', type: 'rattler', targets: 'trout' })
      .end((err, res) => {
        let lure = JSON.parse(res.text);
        lures.push(lure);
        done();
      });
    });
    after(done => {
      lures.forEach(lure => {
        fs.unlinkProm(`${DATA_URL}/lure/${lure.id}.json`);
      });
      done();
    });

    describe('requests made to api/lure', function() {

      it('should have response status of 200', done => {
        chai.request(server)
          .put(`api/note/${lures[0].id}`)
          .send({id: lures[0].id, name: lures[0].name, type: lures[0].type, targets: lures[0].targets, water: 'fresh'})
          .end((err, res) => {
            console.log('MY RESPONSE FOR A PUT ', res.status);
            expect(res.status).to.equal(200);
            done();
          });
      });

      it('should have a response status of 404 if given bad or no schema', done => {
        chai.request(server)
          .put('/api/boogers')
          .send({id: lures[0].id, name: 'minnow', type: lures[0].type, targets: lures[0].targets})
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
      });
    });

    it('should modify a specific record if given the correct inputs', done => {
      chai.request(server)
          .put('/api/note')
          .send({id: lures[0].id, name: 'minnow', type: lures[0].type, targets: lures[0].targets})
          .end((err, res) => {
            expect(res.body.name).to.equal('minnow');
            done();
          });
    });
  });

  describe('#GET method', function() {
    let lures = [];
    let lure;
    before(done => {
      chai.request(server)
      .post('/api/lure')
      .send(sampleLure)
      .end((err, res) => {
        lure = res.body.toString();
        lures.push(lure);
        done();
      });
    });
    after(done => {
      lures.forEach(lure => {
        fs.unlinkProm(`${DATA_URL}/lure/${lure.id}.json`);
      });
      done();
    });

    describe('api/lure route', function() {
      describe('a properly formatted request', function() {
        it('should return a lure given proper id', done => {
          chai.request(server)
          .get('/api/lure:id=${lures[0].id}')
          .end((err, res) => {
            let lure = res.text.toString();
            expect(lures[0]).to.deep.equal(lure);
            expect(res).to.have.status(200);
            done();
          });
        });
      });
      describe('an improperly formatted request', function() {
        it('should return 400, bad request', done => {
          chai.request(server)
          .get('/api/lure?id=${}')
          .end((err, res) => {
            let lure = JSON.parse(res.text.toString());
            expect(lures[0]).to.deep.equal(lure);
            expect(res).to.have.status(400);
            done();
          });
        });
      });
      describe('an unregistered route', function() {
        it('should return 404, not found', done => {
          chai.request(server)
          .get('/api/lure?id=${lure.id}')
          .end((err, res) => {
            let lure = JSON.parse(res.text.toString());
            expect(lures[0]).to.deep.equal(lure);
            expect(res).to.have.status(404);
            done();
          });
        });
      });
    });
  });
});
