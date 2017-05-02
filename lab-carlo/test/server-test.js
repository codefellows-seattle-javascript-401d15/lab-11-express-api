'use strict';
const server = require('../server');
const chai = require('chai');
const expect = require('chai').expect;
const http = require('chai-http');

chai.use(http);

describe('server module', function() {
  let app;
  before(done => {
    app = server.listen(8000);
    done();
  });


  // describe('GET method', function() {
  //   describe('/api/auto route', function() {
  //     let resource;
  //     before(done => {
  //       chai.request(server)
  //       .post('/api/auto')
  //       .send({make: 'Mazda', model: 'RX-7'})
  //       .end((err, res) => {
  //         resource = JSON.parse(res.text.toString());
  //       });
  //       done();
  //     });
  //
  //     describe('A car model should be returned', function() {
  //       it('should return the car from its id', done => {
  //         chai.request(server)
  //         .get(`/api/auto/:id`)
  //         .end((err, res) => {
  //           if(err) console.error(err);
  //           let car = JSON.parse(res.text.toString());
  //           expect(resource).to.deep.equal(car);
  //           done();
  //         });
  //       });
  //       it('should return a status code of 200 on good request', function(done) {
  //         chai.request(server)
  //         .get(`api/auto/:id`)
  //         .end((err, res) => {
  //           if(err) console.error(err);
  //           expect(res.status).to.equal(200);
  //           done();
  //         });
  //       });
  //       it('should return a status code of 404 on bad request', function(done) {
  //         chai.request(server)
  //         .get('api/wrong')
  //         .end((err, res) => {
  //           if(err) console.error(err);
  //           expect(res.status).to.equal(404);
  //           done();
  //         });
  //       });
  //     });
  //
  //     after(done => {
  //       chai.request(server)
  //       .delete('/api/auto')
  //       .query({id: resource.id})
  //       .end((err, res) => {
  //         console.log(res);
  //         done();
  //       });
  //     });
  //   });
    // describe('PUT method', function() {
    //   let putResource;
    //   before(done => {
    //     chai.request(server)
    //     .post('/api/auto')
    //     .send({'name': 'Mazda', 'car': 'RX-7'})
    //     .end((err, res) => {
    //       putResource = JSON.parse(res.text.toString());
    //     });
    //     done();
    //   });
    // });

  });
  after(done => {
    app.close();
    done();
  });
});
