'use strict'

const server = require('../server')
const chai = require('chai')
const http = require('chai-http')
const expect = chai.expect

chai.use(http)

describe('server module', function() {
  before(done => {
    server.listen(3000)
    done()
  })
  after(done => {
    server.close()
    done()
  })

  describe('GET method', function() {
    let resource
    before(done => {
      chai.request(server)
      .post('/api/ninjas')
      .send({name: 'george', clan: 'teastwood', weapons: 'smoke bombs'})
      .end((err, res) => {
        resource = JSON.parse(res.text.toString())
        done()
      })
    })
    after(done => {
      chai.request(server)
      .delete('/api/ninjas')
      .query({id: resource.id})
      .end((err, res) => {
        done()
      })

    })
    describe('/api/ninja-routes', function() {
      describe('a properly formatted reqeust', function() {
        it('should return a resource given proper id', done => {
          chai.request(server)
          .get(`/api/ninja?id=${resource.id}`)
          .end((err, res) => {
            let expected = JSON.parse(res.text.toString())
            expect(resource).to.deep.equal(expected)
            done()
          })
        })
      })
      describe('an improperly formatted request', function() {
        chai.request(server)
        .get(`/api/toy?&$*id=${resource.id}`)
        .end((err, res) => {
          let expected = JSON.parse(res.text.toString())
          expect(resource).to.not.equal(expected)
          done()
      })

    })

    describe('unregistered route', function() {

    })
  })

  describe('POST method', function() {
    describe('/api/toy route', function() {

    })
  })

  describe('PUT method', function() {
    describe('/api/toy route', function() {

    })
  })

  describe('DELETE method', function() {
    describe('/api/toy route', function() {

    })
  })
})
