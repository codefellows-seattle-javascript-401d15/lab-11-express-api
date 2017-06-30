const http = require('chai-http');
const chai = require('chai');
const server = require('../server');
const expect = chai.expect;


chai.use(http);

describe('Server check', function () {

  describe('POST method', function () {
    describe('/api/doge endpoint', function () {
      it('should respond with a 404 on bad request', done => {
        chai.request(server)
        .post('/bad')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
      it('should return a doge', (done) => {
        chai.request(server)
        .post('/api/doge')
        .send({name: 'milo', type: 'lab'})
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
      .post('/api/doge')
      .send({name: 'milo', type: 'lab', color: 'black'})
      .end((err, res) => {
        resource = JSON.parse(res.text);
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete('/api/doge')
      .query({id: resource.id})
      .end(() => {
        console.error();
        done();
      });
    });
    describe('/api/doge endpoint', function () {
      describe('An incorrect request', function () {
        it('should return an error', done => {
          chai.request(server)
        .get('/api/doge/')
        .end((err, res) => {
          if(err) throw err;
          expect(res).to.have(err);
        });
          done();
        });
        it('should respond with a 400 on bad request', done => {
          chai.request(server)
          .post('/bad')
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
      .post('/api/doge')
      .send({name: 'milo', type: 'lab'})
      .end((err, res) => {
        resource = JSON.parse(res.text.toString());
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete('/api/doge:id')
      .query({id: resource.id})
      .end(() => {
        console.error();
        done();
      });
    });
    describe('/api/doge endpoint', function () {
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .post('/bad')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
      it('should respond with a 201 on proper request', done => {
        chai.request(server)
        .get(`/api/doge/${resource.id}`)
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
      .post('/api/doge')
      .send({name: 'milo', type: 'lab'})
      .end((err, res) => {
        resource = JSON.parse(res.text.toString());
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete('/api/doge')
      .query({id: resource.id})
      .end(() => {
        console.error();
        done();
      });
    });
    describe('/api/doge update ', function () {
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .post('/bad')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
    describe('PUT method', function() {
      describe('/api/doge', function() {
        before(done => {
          chai.request(server)
          .post('/api/doge')
          .send({ name: 'dog', type: 'lab', color: 'blue'})
          .end((err, res) => {
            this.result = JSON.parse(res.text);
            done();
          });
        });
      });
    });
  });
});
