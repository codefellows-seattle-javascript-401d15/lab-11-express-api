'use strict';

const server = require('../server.js');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

chai.use(http);

describe('server module', function(){
  let app;
  before(done => {
    app = server.listen(4000);
    done();
  });
  after(done => {
    app.close();
    done();
  });

  describe('GET', function(){
    it('should return the created note data', function(){

    });
  });
  describe('POST', function(){
    describe('the post to /api/note', function(){
      it('should POST a new note in the data folder', function(){

      });
    });
  });
  describe('PUT', function(){
    let ids = [];
    before(done => {
      chai.request(server)
      .post('/api/note')
      .send({name: 'hello', details: 'wat-man'})
      .end((err, res) => {
        console.error(err);
        let note = JSON.parse(res.body);
        ids.push(note.id);
        console.log(ids);
        done();
      });
    });
    after(done => {
      ids.forEach( note => {
        fs.unlinkProm(`${__dirname}/../data/note/${note.id}.json`);
        done();
      });
    });
    describe('requests made to /api/note', function(){
      it('should have a status of response status 200', done => {
        chai.request(server)
        .put('/api/note')
        .send({id: note[0].id, name: note[0].name, details: note[0].details})
        .end((err, res) => {
          console.error(err);
          expect(res).to.have.status(200);
          done();
        });
      });
      it('should modify a specific record, given the correct inputs', done => {

        done();
      });
      it('should have a response status of 404 no id', done => {

        done();
      });
      it('should have a response status of 404 no id', done => {

        done();
      });
    });
    describe('requests made to the wrong route', function() {
      it('should do some stuff', done => {


        done();
      });
    });
  });
  describe('DELETE', function(){

  });
});
