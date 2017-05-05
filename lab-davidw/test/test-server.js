
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

  describe('PUT method', function() {

    before(done => {
      chai.request(server)
      .post('/api/lure')
      .send({ name: 'test', type: 'rattler', targets: 'trout' })
      .end((err, res) => {
        let lure = JSON.parse(res.text);
        lures.push(lure);
        done();
      });
    });

    describe('requests made to api/lure', function() {

      it('should have response status of 200', done => {
        chai.request(server)
          .put(`/api/lure/${lures[0].id}`)
          .send({name: 'minnow', type: 'rattler', targets: 'trout'})
          .end((err, res) => {
            console.error(err);
            expect(res).to.have.status(200);
            done();
          });
      });

      it('should have a response status of 404 if given bad or no schema', done => {
        chai.request(server)
          .put('/api/boogers')
          .send({name: lures[0].name, type: lures[0].type, targets: lures[0].targets, id: lures[0].id})
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
      });
    });

    it('should modify a specific record if given the correct inputs', done => {
      chai.request(server)
          .put(`/api/lure/${lures[0].id}`)
          .send({name: 'newString'})
          .end((err, res) => {
            // console.log('Here is the NAME of the id I am changing ', res.body.name);
            expect(res.body.name).to.equal('newString');
            done();
          });
    });
  });

  describe('#GET method', function() {

    before(done => {
      chai.request(server)
      .post('/api/lure')
      .send({ name: 'test', type: 'rattler', targets: 'trout' })
      .end((err, res) => {
        let lure = JSON.parse(res.text);
        lures.push(lure);
        done();
      });
    });

    describe('api/lure route', function() {
      describe('a properly formatted request', function() {
        it('should return 200', done => {
          chai.request(server)
            .get(`/api/lure/${lures[0].id}`)
            .send({name: 'minnow', type: 'rattler', targets: 'trout'})
            .end((err, res) => {
              console.error(err);
              expect(res).to.have.status(200);
              done();
            });
        });

        describe('an improperly formatted request', function() {
          it('should return 404, bad request', done => {
            chai.request(server)
              .get(`/api/boogers/${lures[0].id}`)
              .send({name: 'minnow', type: 'rattler', targets: 'trout'})
              .end((err, res) => {
                expect(res).to.have.status(404);
                done();
              });
          });
          after(done => {
            lures.forEach(lure => {
              fs.unlinkProm(`${DATA_URL}/lure/${lure.id}.json`);
            });
            done();
          });
        });
      });

      describe.only('DELETE method', function() {

        before(done => {
          chai.request(server)
          .post('/api/lure')
          .send({ name: 'test', type: 'rattler', targets: 'trout' })
          .end((err, res) => {
            let lure = JSON.parse(res.text);
            lures.push(lure);
            done();
          });
        });
        it('should return 204', done => {
          chai.request(server)
            .delete(`/api/lure/${lures[0].id}`)
            .send({name: 'minnow', type: 'rattler', targets: 'trout'})
            .end((err, res) => {
              console.error(err);
              expect(res).to.have.status(204);
              done();
            });
        });
      });
    });
  });
});
