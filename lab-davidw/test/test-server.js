
'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const expect = chai.expect;
const DATA_URL = `${__dirname}/../data`;

const sampleLure = {
  name: 'momba',
  type: 'rattler',
  targets: 'trout',
  water: 'fresh',
};

chai.use(http);

describe('server module', function() {
  let app;
  before(done => {
    app = server.listen(7673);
    done();
  });
  after(done => {
    app.close();
    done();
  });

  describe('PUT method', function() {
    let lures = [];
    before(done => {
      chai.request(server)
        .post('/api/lure')
        .send({name: 'test', type: 'rattler', targets: 'trout' })
        .end((err, res) => {
          let lure = JSON.parse(res.body);
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
          .put('api/note')
          .send({id: lures[0].id, name: lures[0].name, type: lures[0].type, targets: lures[0].targets, water: 'fresh'})
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });

      it('should have a response status of 404 if given no id', done => {

        done();
      });

      it('should have a respone status of 404 if given bad or no schema', done => {
        chai.request(server)
          .put('/api/note')
          .send({id: lures[0].id, name: 'minnow', type: lures[0].type, targets: lures[0].targets})
          .end((err, res) => {
            expect(res.body.name).to.equal('minnow');
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
