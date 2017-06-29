'use strict'

const server = require('../server.js')
const chai = require('chai')
const http = require('chai-http')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'})
const expect = chai.expect

chai.use(http)

let testNoteId
describe('server module', () => {
  let app
  before(done => {
    app = server.listen(4000)
    done()
  })
  after(done => {
    app.close()
    done()
  })

  describe('POST', () => {
    let app
    before(done => {
      app = server.listen(5000)
      done()
    })
    after(done => {
      app.close()
      done()
    })
    describe('the post to /api/note', () => {
      it('should POST a new note, and return a 200 error', done => {
        chai.request(server)
        .post('/api/note')
        .send({name: 'hello', details: 'wat-man'})
        .end((err, res) => {
          if(err) console.error(err)
          testNoteId = JSON.parse(res.body).id
          expect(res).to.have.status(200)
          done()
        })
      })
      it('should attempt to post and fail, with a 404 err', done => {
        chai.request(server)
        .post('/api/note/na-na-na-na-na-na-na-na-na-na-na-na-na-na-na-na')
        .send({name: 'hello', details: 'wat-man'})
        .end((err, res) => {
          expect(res).to.have.status(404)
          done()
        })
      })
    })
  })

  describe('GET', () => {
    it('should return the created note data', done => {
      chai.request(server)
      .get(`/api/note/${testNoteId}`)
      .end((err, res) => {
        if(err) console.error(err)
        expect(res.status).to.equal(200)
        done()
      })
    })
    it('should return a 404 not found', done => {
      chai.request(server)
      .get(`/api/note`)
      .end((err, res) => {
        expect(res.status).to.equal(404)
        done()
      })
    })
  })

  describe('PUT', () => {
    let notes = []
    before(done => {
      chai.request(server)
      .post('/api/note')
      .send({name: 'hello', details: 'wat-man'})
      .end((err, res) => {
        if(err) console.error(err)
        let note = JSON.parse(res.body)
        notes.push(note)
        done()
      })
    })
    after(done => {
      notes.forEach(note => {
        fs.unlinkProm(`${__dirname}/../data/note/${note.id}.json`)
        done()
      })
    })
    describe('requests made to /api/note', () => {
      it('should have a status of response status 200', done => {
        chai.request(server)
        .put('/api/note')
        .send({id: notes[0].id, name:'Captain America', details: 'Is an asshole'})
        .end((err, res) => {
          if(err) console.error(err)
          expect(res).to.have.status(200)
          done()
        })
      })
      it('requests to non-existant routes should return 404', done => {
        chai.request(server)
        .put('/api/notemon')
        .send({id: notes[0].id, name: 'Captain Wackmerica', details: 'Is a terrible person.'})
        .end((err, res) => {
          expect(res).to.have.status(404)
          done()
        })
      })
    })
  })

  describe('DELETE', () => {
    let notes = []
    let app
    before(done => {
      chai.request(server)
      .post('/api/note')
      .send({name: 'hello', details: 'wat-man'})
      .end((err, res) => {
        console.error(err)
        let note = JSON.parse(res.body)
        notes.push(note)
        done()
      })
      after(done => {
        app.close()
        done()
      })
      it('should delete a file successfully, and return 200', () => {
        chai.request(server)
        .delete(`/api/note/${testNoteId}`)
        .end((err, res) => {
          if(err) console.error(err)
          expect(res).to.have.status(200)
        })
      })
      it('should fail to delete a file, and return error 404', () => {
        chai.request(server)
        .delete('/api/knowte')
        .end((err, res) => {
          expect(res).to.have.status(404)
        })
      })
    })
  })
})
