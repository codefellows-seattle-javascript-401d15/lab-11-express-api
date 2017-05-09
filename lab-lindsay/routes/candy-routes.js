'use strict';

const storage = require('../lib/storage');
const Candy = require('../model/candy');
const debug = require('debug')('http:candy-routes');

module.exports = function(router) {
  router.get('/api/candy', function(req, res) {
    debug('GET /api/candy');
    if(req.url.query.id) {
      storage.fetchCandy('candy', req.url.query.id)
      .then(candy => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(candy));
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type' : 'text/plain'});
        res.write('not found');
        res.end();
      });
      return;
    }
    res.writeHead(400, {'Content-Type' : 'text/plain'});
    res.write('bad request');
    res.end();
  });

  router.post('/api/candy', function(req, res) {
    debug('POST /api/candy');
    try {
      let candy = new Candy(req.body.name, req.body.type, req.body.texture);
      storage.createCandy('candy', candy)
      .then(newCandy => {
        res.writeHead(201, {'Content-Type': 'text/plain'});
        res.write(JSON.stringify(newCandy));
        res.end();
      });
    } catch(err) {
      console.error(err);
      res.writeHead(400, {'Content-Type' : 'text/plain'});
      res.write('bad request');
      res.end();
    }
  });

  router.delete('/api/candy', function(req, res) {
    debug('DELETE /api/candy');
    if(req.url.query.id) {
      storage.removeCandy('candy', req.url.query.id)
      .then(() => {
        res.writeHead(204, {'Content-Type' : 'application/json'});
        res.write('candy deleted successfully');
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type' : 'text/plain'});
        res.write('not found');
        res.end();
      });
      return;
    }
    res.writeHead(400, {'Content-Type' : 'text/plain'});
    res.write('bad request');
    res.end();
  });

  router.put('/api/candy', function(req, res) {
    debug('PUT /api/candy');
    storage.updateCandy('candy', req.body.id, req.body)
    .then(candy => {
      res.writeHead(202, {'Content-Type' : 'text/plain'});
      res.write(JSON.stringify(candy));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(400, {'Content-Type' : 'text/plain'});
      res.write('bad request');
      res.end();
    });
    return;
  });
};
