'use strict';

const server = require('../server.js');
const chai = require('chai');
const expect = chai.expect;
const http = require('chai-http');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

chai.use(http);

describe('Server module tests', function() {
  let app;
  before(done => {
    app = server.listen(8000);
    done();
  });
  
  describe('POST method', function() {
    describe.only('create an item', function() {  
      it('should create an artist', done => {
        chai.request(server)
        .post('/api/album')
        .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
        .end((err, res) => {
          if (err) console.error('oh no!', err);
          expect(JSON.parse(res.body).artist).to.equal('Billy Joel');
          done();
        });
      });
      
      it('should create a title', done => {
        chai.request(server)
        .post('/api/album')
        .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(JSON.parse(res.body).title).to.equal('An Innocent Man');
          done();
        });
      });
      
      it('should create the year', done => {
        chai.request(server)
        .post('/api/album')
        .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(JSON.parse(res.body).year).to.equal('1983');
          done();
        });
      });
      
      it('should respond with 200 on a correct request', done => {
        chai.request(server)
        .post('/api/album')
        .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
      
      it('should respond with 404 if not found', done => {
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
      
      it('should be an object', done => {
        chai.request(server)
        .post('/api/album')
        .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res).to.be.a('object');
          done();
        });
      });
    });
  });
  
  describe('GET method', function() {
    let testGet;
    before(done => {
      chai.request(server)
      .post('/api/album')
      .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
      .end((err, res) => {
        testGet = JSON.parse(res.text.toString());
      });
      done();
    });
    
    describe('A request should return an item', function() {
      it('should return the correct response if the id is passed in', done => {
        chai.request(server)
        .get(`/api/album/${testGet.id}`)
        .end((err, res) => {
          if (err) console.error(err);
          let expectedResult = JSON.parse(res.text.toString());
          expect(testGet).to.deep.equal(expectedResult);
          done();
        });
      });
      
      it('should return a status of 200 on proper request', done => {
        chai.request(server)
        .get(`/api/album/${testGet.id}`)
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
      
      it('should return an error on a bad request', done => {
        chai.request(server)
        .get('/api/blah')
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
      
      it('should be an object', done => {
        chai.request(server)
        .post('/api/album')
        .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res).to.be.a('object');
          done();
        });
      });
    });
        
    describe('Error if not found', function() {
      it('should respond with 404 if not found', done => {
        chai.request(server)
        .get('/')
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
    
    after(done => {
      chai.request(server)
      .delete('/api/album')
      .query({id: testGet.id})
      .end(() => {
        done();
      });
    });
  });
  
  describe('PUT method', function(){
    let testPut = [];
    before(done => {
      chai.request(server)
      .post('/api/album')
      .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
      .end((err, res) => {
        let test = JSON.parse(res.text);
        testPut.push(test);
        console.log('testput array', testPut);
        done();
      });
    });
    
    describe('the entry should update', function() {
      it('should change the artist name', done => {
        chai.request(server)
        .post('/api/album')
        .send({'artist': 'Elton John', 'title': 'Honky Chateau', 'year': '1972'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.body.artist).to.equal('Elton John');
          done();
        });
      });
      
      it('should change the album title', done => {
        chai.request(server)
        .post('/api/album')
        .send({'artist': 'Elton John', 'title': 'Honky Chateau', 'year': '1972'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.body.title).to.equal('Honky Chateau');
          done();
        });
      });
      
      it('should change the year', done => {
        chai.request(server)
        .post('/api/album')
        .send({'artist': 'Elton John', 'title': 'Honky Chateau', 'year': '1972'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.body.year).to.equal('1972');
          done();
        });
      });
      
      it('should be an object', done => {
        chai.request(server)
        .post('/api/album')
        .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res).to.be.a('object');
          done();
        });
      });
      
      it('should return a status of 200 on proper request', done => {
        chai.request(server)
        .put('/api/album')
        .send({id: testPut[0].id, artist: testPut[0].artist, title: testPut[0].title, year: testPut[0].year})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
      
      it('should return an error on a bad request', done => {
        chai.request(server)
        .get('/api/blah')
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
        
    after(done => {
      testPut.forEach(test => {
        fs.unlinkProm(`${__dirname}/../data/album/${test.id}.json`);
        done();
      });
    });
  });
  
  describe('DELETE method', function() {
    let testDelete;
    before(done => {
      chai.request(server)
      .post('/api/album')
      .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
      .end((err, res) => {
        if (err) console.error(err);
        testDelete = JSON.parse(res.text.toString());
      });
      done();
    });
    
    describe('it should delete the item', function() {
      it('should successfully remove the name when provided an id', done => {
        chai.request(server)
        .del(`/api/album?id=${testDelete.id}`)
        .end((err) => {
          if (err) console.error(err);
          expect(testDelete.name).to.be.empty;
          done();
        });
      });
      
      it('should return a status of 404 after deleting the item', done => {
        chai.request(server)
        .del(`/api/album?id=${testDelete.id}`)
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
      
      it('should return an error on a bad request', done => {
        chai.request(server)
        .get('/api/blah')
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
    
    after(done => {
      chai.request(server)
      .delete('api/album')
      .query({id: testDelete.id})
      .end(() => {
        done();
      });
    });
  });
  
  describe('undefined endpoint', function() {
    it('should respond with 404 if not found', done => {
      chai.request(server)
      .post('/nada')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
  
  after(done => {
    app.close();
    done();
  });
});