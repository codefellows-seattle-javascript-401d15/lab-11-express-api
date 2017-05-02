'use strict'

const debug = require('debug')('http:ninja-routes')
const Ninja = require('../model/ninjas')
const storage = require('../lib/storage')

module.exports = function(router) {
  router.get('/api/ninja', function(req, res) {
    debug('GET /api/ninja')
    if(req.url.query.id) {
      storage.fetchItem('ninja', req.url.query.id)
      .then(ninja => {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify(ninja))
        res.end()
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.write('not found, ninja too stealthy')
        res.end()
      })
      return
    }

    res.writeHead(400, {'Content-Type': 'text/plain'})
    res.write('bad request')
    res.end()
  })

  router.post('/api/ninja', function(req, res) {
    debug('POST /api/ninja')
    try {
      let ninja = new Ninja(req.body.name, req.body.clan, req.body.weapons)
      storage.createItem('ninja', ninja)
      .then(newNinja => {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify(newNinja))
        res.end()
      })
    } catch(e) {
      console.error(e)
      res.writeHead(400, {'Content-Type': 'text/plain'})
      res.write('bad request')
      res.end()
    }
  })
}
