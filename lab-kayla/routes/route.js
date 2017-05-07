'use strict';

const storage = require('../lib/storage');
const KillerDragon = require('../model/data');
const debug = require('debug')('http:server');

module.exports = function(router) {
  router.get('/api/dragon/:id', function(req, res) {
    debug('GET /api/dragon');
    if(req.params.id) {
      storage.fetchItem('dragon', req.params.id)
      .then(dragon => {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify(dragon))
        res.end()
      })
      .catch(err => {
        console.error(err)
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.write('not found')
        res.end()
      });
      return
    }
    res.writeHead(400, {'Content-Type': 'text/plain'})
    res.write('bad request')
    res.end()
  })

  router.post('/api/dragon', function(req, res) {
    debug('POST /api/dragon')
    console.log('post route', req.body)
    try {
      let dragon = new KillerDragon(req.body.name, req.body.type, req.body.hazard)
      storage.createItem('dragon', dragon)
      .then(newDragon => {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify(newDragon))
        res.end()
      })
    } catch(e) {
      console.error(e)
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request');
      res.end();
    }
  })

  router.put('/api/dragon/:id', function(req, res) {
    debug('PUT /api/dragon');
    if(req.params.id) {
      storage.updateItem('dragon', req.params.id, req.body)
      .then(dragon => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(dragon));
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('not found');
        res.end();
      });
      return;
    }
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  });

  router.delete('/api/dragon/:id', function(req, res) {
    debug('DELETE /api/dragon')
    if(req.params.id) {
      storage.deleteItem('dragon', req.params.id)
      .then( () => {
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.write('deleted');
        res.end()
      })
      .catch(err => {
        console.error(err)
        res.writeHead(400, {'Content-Type': 'text/plain'})
        res.write('item not found')
        res.end()
      })
      return
    }
  });
}
