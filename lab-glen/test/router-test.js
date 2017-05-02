const http = require('chai-http');
const chai = require('chai');
const server = require('../server');
const expect = chai.expect;


chai.use(http);

describe('Server function check', function () {

  describe('POST method', function () {
    describe('/api/weapon endpoint', function () {
      it('should respond with a 404 on bad request', done => {
        chai.request(server)
        .post('/wrong')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
      it('should return a weapon', (done) => {
        chai.request(server)
        .post('/api/weapon')
        .send({name: 'punisher', type: 'shotgun'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res).to.have.status(200);
          done();
        });
      });
    });
  });

  describe('GET method', function () {
    let resource;
    before(done => {
      chai.request(server)
      .post('/api/weapon')
      .send({name: 'destroyer', type: 'hammer', price: '300'})
      .end((err, res) => {
        resource = JSON.parse(res.text);
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete('/api/weapon')
      .query({id: resource.id})
      .end(() => {
        console.error();
        done();
      });
    });
    describe('/api/weapon endpoint', function () {
      describe('An incorrectly formatted request', function () {
        it('should return an error', done => {
          chai.request(server)
        .get('/api/weapon/')
        .end((err, res) => {
          if(err) throw err;
          expect(res).to.have(err);
        });
          done();
        });
        it('should respond with a 400 on bad request', done => {
          chai.request(server)
          .post('/wrong')
          .send({})
          .end((err, res) => {
            expect(res.status).to.equal(404);
          });
          done();
        });
      });
    });
  });

  describe('DELETE method', function () {
    let resource;
    before(done => {
      chai.request(server)
      .post('/api/weapon')
      .send({name: 'destroyer', type: 'hammer'})
      .end((err, res) => {
        resource = JSON.parse(res.text.toString());
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete('/api/weapon:id')
      .query({id: resource.id})
      .end(() => {
        console.error();
        done();
      });
    });
    describe('/api/weapon endpoint', function () {
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .post('/wrong')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
      it('should respond with a 201 on proper request', done => {
        chai.request(server)
        .get(`/api/weapon/${resource.id}`)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
  });

  describe('UPDATE method', function () {
    let resource;
    before(done => {
      chai.request(server)
      .post('/api/weapon')
      .send({name: 'destroyer', type: 'hammer'})
      .end((err, res) => {
        resource = JSON.parse(res.text.toString());
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete('/api/weapon')
      .query({id: resource.id})
      .end(() => {
        console.error();
        done();
      });
    });
    describe('/api/weapon update endpoint', function () {
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .post('/wrong')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
      it('should respond with a 201 on proper request', done => {
        chai.request(server)
        .delete(`/api/weapon/${resource.id}`)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
    // describe('PUT method should update an item', function() {
    //   it('should update an item', done => {
    //     chai.request(server)
    //     .get(`/api/weapon?id=${resource.id}`)
    //     .end(function(err, res) {
    //       let expected = JSON.parse(res.text.toString());
    //       console.log(expected.id);
    //       if(err) throw err;
    //       chai.request(server)
    //       .put(`/api/weapon?id=${expected.id}`)
    //       .send({name: 'glen', type:'shotgun'})
    //       .end(function(error, response)  {
    //         if(error) throw error;
    //         expect(response.status).to.equal(201);
    //
    //         done();
    //       });
    //     });
    //   });
    // });

  });
});
