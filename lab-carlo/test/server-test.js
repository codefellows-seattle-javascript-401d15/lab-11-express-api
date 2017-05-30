'use strict';
const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

chai.use(http);

describe('server module', function() {
  let app;
  before(done => {
    app = server.listen(5000);
    done();
  });
  after(done => {
    app.close();
    done();
  });
  describe('GET method', function() {
    describe('/api/auto route', function() {
      let resource;
      before(done => {
        chai.request(server)
        .post('/api/auto')
        .send({name: 'Mazda', car: 'RX-7'})
        .end((err, res) => {
          resource = JSON.parse(res.text.toString());
        });
        done();
      });
      after(done => {
        server.close();
        done();
      });
      describe('A car model should be returned', function() {
        it('should return the car from its id', done => {
          chai.request(server)
          .get(`/api/auto?id=${resource.id}`)
          .end((err, res) => {
            if(err) console.error(err);
            let car = JSON.parse(res.text.toString());
            expect(resource).to.deep.equal(car);
            done();
          });
        });
        it('should return a status code of 200 on good request', function() {
          chai.request(server)
          .get(`api/auto?id=${resource.id}`)
          .end((err, res) => {
            if(err) console.error(err);
            expect(res.status).to.equal(200);
          });
        });
        it('should return a status code of 404 on bad request', function() {
          chai.request(server)
          .get('api/wrong')
          .end((err, res) => {
            if(err) console.error(err);
            expect(res.status).to.equal(404);
          });
        });
      });

      after(done => {
        chai.request(server)
        .delete('/api/auto')
        .query({id: resource.id})
        .end((err, res) => {
          console.log(res);
          done();
        });
      });
    });
  });

  describe('POST method', function() {
    describe('a new instance of Automobile', function() {
      it('should create a new Automobile name value', done => {
        chai.request(server)
        .post('/api/auto')
        .send({'name': 'Mazda', 'car':'RX-7'})
        .end((err, res) => {
          if(err) console.error(err);
          console.log('res.body', res.body);
          expect(res.body.name).to.equal('Mazda');
          done();
        });
      });
      it('should create a new Automobile car value', done => {
        chai.request(server)
        .post('/api/auto')
        .send({'name': 'Mazda', 'car': 'RX-7'})
        .end((err, res) => {
          if(err) console.error(err);
          console.log('res.body', res.body);
          expect(res.body.car).to.equal('RX-7');
          done();
        });
      });
      it('should return a status code of 201 on good request', done => {
        chai.request(server)
        .post('/api/auto')
        .send({'name': 'Mazda', 'car': 'RX-7'})
        .end((err, res) => {
          if(err) console.error(err);
          console.log('res.body', res.body);
          expect(res.status).to.equal(201);
          done();
        });
      });
      it('should return a status code of 400 on bad request', done => {
        chai.request(server)
        .post('/api/stuff')
        .send({'name': 'Mazda', 'car': 'RX-7'})
        .end((err, res) => {
          if(err) console.error(err);
          console.log('res.body', res.body);
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('DELETE method', function() {
    let testCar;
    before(done => {
      chai.request(server)
      .post('/api/auto')
      .send({'name': 'Mazda', 'car': 'RX-7'})
      .end((err,res) => {
        if(err) console.log(err);
        testCar = JSON.parse(res.text.toString());
        done();
      });
    });
    it('should return a status code of 200 on good request', done => {
      chai.request(server)
      .get(`/api/auto?id=${testCar.id}`)
      .send({})
      .end((err, res) => {
        if(err) console.error(err);
        console.log('res.body', res.body);
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should return a status code of 400 on bad request', done => {
      chai.request(server)
      .get('/api/stuff')
      .send({})
      .end((err, res) => {
        if(err) console.error(err);
        console.log('res.body', res.body);
        expect(res.status).to.equal(400);
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete('/api/auto')
      .query({id: testCar.id})
      .end((err, res) => {
        console.error(err);
        console.log(res);
        done();
      });
    });
  });
  describe('PUT method', function () {
    let testCar;
    before(done => {
      chai.request(server)
      .post('/api/auto')
      .send({name: 'Mazda', car: 'RX-7'})
      .end((err, res) => {
        testCar = JSON.parse(res.text.toString());
        done();
      });
    });
    it('should return a status code of 200 on good request', done => {
      chai.request(server)
      .get(`/api/auto?id=${testCar.id}`)
      .send({})
      .end((err, res) => {
        if(err) console.error(err);
        console.log('res.body', res.body);
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should return a status code of 400 on bad request', done => {
      chai.request(server)
      .post('/api/stuff')
      .send({})
      .end((err, res) => {
        if(err) console.error(err);
        console.log('res.body', res.body);
        expect(res.status).to.equal(400);
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete('/api/auto')
      .query({id: testCar.id})
      .end((err, res) => {
        console.error(err);
        console.log(res);
        done();
      });
    });
  });
});
