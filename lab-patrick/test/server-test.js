'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('server module', function() {
  let app;
  before(done => {
    app = server.listen(8080);
    done();
  });
  describe('GET method', function() {
    let resource;
    before(done => {
      chai.request(server)
      .post('/api/car')
      .send({'name': 'WRX', 'model': 'Subaru', 'horserpower': 200})
      .end((err, res) => {
        resource = JSON.parse(res.text.toString());
      });
      done();
    });

    describe ('Return car by Id', function(){
      // it('should return a car given id', done =>{
      //   chai.request(server)
      //   .get(`/api/car/:id`)
      //   .end((err , res) => {
      //     if(err) console.error(err);
      //     let fetchedCar = JSON.parse(res.body.toString());
      //     expect(resource).to.deep.equal(fetchedCar);
      //     done();
      //   });
      // });
      it('should return status 200 if correct route', done =>{
        chai.request(server)
        .get(`/api/car/:id`)
        .end((err, res) =>{
          if(err) throw err;
          expect(res.status).to.equal(200);
          done();
        });
      });
      it('should return status 404 if bad request', done =>{
        chai.request(server)
        .get('/api/unknown')
        .end((err, res) =>{
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
  after(done => {
    app.close();
    done();
  });
});
