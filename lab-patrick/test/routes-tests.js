'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const Promise =require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix:'Prom'});
const expect = chai.expect;



chai.use(http);

describe('server module', function() {
  let app;
  before(done => {
    app = server.listen(8080);
    done();
  });
  after(done => {
    app.close();
    done();
  });

  // describe('GET method', function() {
  //   describe('api/car routes', function(){
  //     let resource;
  //     before(done => {
  //       chai.request(server)
  //       .post('/api/car')
  //       .send({'name': 'WRX', 'model': 'Subaru', 'horserpower': 200})
  //       .end((err, res)=>{
  //         resource = JSON.parse(res.text.toString());
  //       });
  //       done();
  //     });
  //     after(done =>{
  //       server.close();
  //       done();
  //     });
  //     describe ('Return car by Id', function(){
  //       it('should return a car given id', done =>{
  //         chai.request(server)
  //         .get(`/api/car/${resource.id}`)
  //         .end((err , res) => {
  //           if(err) console.error(err);
  //           let carResp = JSON.parse(res.text.toString());
  //           expect((resource).to.equal(carResp));
  //           done();
  //         });
  //       });
  //
  //       it('should return status 200 if correct route', done =>{
  //         console.log();
  //         chai.request(server)
  //         .get(`/api/car/${resource.id}`)
  //         .end((err, res) =>{
  //           if(err) throw err;
  //           expect(res.status).to.equal(200);
  //           done();
  //         });
  //       });
  //
  //       it('should return status 404 if bad request', done =>{
  //         chai.request(server)
  //         .get('/api/unknown')
  //         .end((err, res) =>{
  //           expect(res.status).to.equal(404);
  //           done();
  //         });
  //       });
  //     });
  //   });
  // });

  describe('POST method', function(){

  });

  describe('PUT method', function(){
    let cars =[];
    before(done => {
      chai.request(server)
      .post('/api/car')
      .send({'name': 'WRX', 'model': 'Subaru', 'horserpower': 200})
      .end((err, res)=>{
        let car = JSON.parse(res.body);
        cars.push(car);
        console.log(cars);
        done();
      });
    });
    after(done =>{
      cars.forEach(car => {
        fs.unlinkProm(`${__dirname}/../data/car/${car.id}[0].json`);
      });
      done();
    });
    describe('requests made to /api/car', function(){
      it('should have a response status of 200', done =>{
        chai.request(server)
        .put('api/car/')
        .send({id: cars[0].id, name: cars[0].name, model: cars[0].model, horsepower: cars[0].horsepower})
        .end((err, res) => {
          expect(res).to.have.status(200);
        });
        done();
      });
      it('should have a response ststus of 404 given no id', done =>{
        chai.request(server)
        .put('api/car/')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
        });
        done();
      });
      it('should modify a record given correct inputs', done =>{
        chai.request(server)
        .put('/api/car/')
        .send({id: cars[0].id, name: 'foobar'})
        .end((err, res) => {
          expect(res.body.name).to.equal('foobar');
          done();
        });
      });
    });
    describe('requests made to invalid route', function(){

    });
  });
});
