'use strict';

const server = require('../server.js');
const chai = require('chai');
const http = require('chai-http');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const expect = chai.expect;

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
    let app;
    before(done => {
      app = server.listen(4000);
      done();
    });
    after(done => {
      app.close();
      done();
    });
    describe('the post to /api/note', function(){
      it('should POST a new note, and return a 200 error', done => {
        chai.request(server)
        .post('/api/note')
        .send({name: 'hello', details: 'wat-man'})
        .end((err, res) => {
          console.error(err);
          expect(res).to.have.status(200);
          done();
        });
      });
      it('should attempt to post and fail, with a 404 err', done => {
        chai.request(server)
        .post('/api/note/na-na-na-na-na-na-na-na-na-na-na-na-na-na-na-na')
        .send({name: 'hello', details: 'wat-man'})
        .end((err, res) => {
          console.log(err);
          expect(res).to.have.status(404);
          done();
        });
      });
    });
  });



  describe('PUT', function(){
    let notes = [];
    before(done => {
      chai.request(server)
      .post('/api/note')
      .send({name: 'hello', details: 'wat-man'})
      .end((err, res) => {
        console.error(err);
        let note = JSON.parse(res.body);
        notes.push(note);
        console.log(notes);
        done();
      });
    });
    after(done => {
      notes.forEach(note => {
        fs.unlinkProm(`${__dirname}/../data/note/${note.id}.json`);
        done();
      });
    });
    describe('requests made to /api/note', function(){
      it('should have a status of response status 200', done => {
        chai.request(server)
        .put('/api/note')
        .send({id: notes[0].id, name:'Captain America', details: 'Is an asshole'})
        .end((err, res) => {
          console.error(err);
          expect(res).to.have.status(200);
          done();
        });
      });
      it('requests to non-existant routes should return 404', done => {
        chai.request(server)
        .put('/api/notemon')
        .send({id: notes[0].id, name: 'Captain Wackmerica', details: 'Is a terrible person.'})
        .end((err, res) => {
          console.log('You have successfully failed.');
          expect(res).to.have.status(404);
          done();
        });
      });
    });
  });




  describe('DELETE', function(){
    let notes = [];
    before(done => {
      chai.request(server)
      .post('/api/note')
      .send({name: 'hello', details: 'wat-man'})
      .end((err, res) => {
        console.error(err);
        let note = JSON.parse(res.body);
        notes.push(note);
        console.log(notes);
        done();
      });
    });
    after(done => {
      notes.forEach(note => {
        fs.unlinkProm(`${__dirname}/../data/note/${note.id}.json`);
        done();
      });
    });
    //Success
    it('should delete a file successfully, and return 200', function(){
      chai.request(server)
      .delete('/api/note')
      .send({id: notes[0].id})
      .end((err, res) => {
        console.log('You have successfully failed');
        expect(res).to.have.status(200);
      });
    });
    //failure
    it('should fail to delete a file, and return error 404', function(){
      chai.request(server)
      .delete('/api/knowte')
      .send({id: notes[0].id})
      .end((err, res) => {
        console.log('You have successfully failed');
        expect(res).to.have.status(200);
      });
    });
  });
});
