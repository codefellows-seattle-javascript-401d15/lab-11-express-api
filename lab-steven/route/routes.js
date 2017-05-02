'use strict';

const debug = require('debug')('#http:routes');
const Seahawk = require('../model/seahawk');
const storage = require('../lib/storage');

module.exports = function(router){
  router.get('/api/seahawk', function(req, res){
    debug('GET /api/seahawk');
    if(req.url.query.id) {
      storage.fetchHawk('hawk', req.url.query.id)
      .then(hawk => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(hawk));
        res.end();
      })
      .catch(err => {
        console.log(err);
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

  router.post('/api/seahawk', function(req, res){
    debug('POST /api/seahawk');
    console.log(req.body);
    try {
      let hawk = new Seahawk(req.body.name, req.body.pos, req.body.round);
      storage.createHawk('hawk', hawk);

      res.writeHead(201, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(hawk));
      res.end();
    } catch(err) {
      res.writeHead(400, {'Content': 'text/plain'});
      res.write('bad request');
      res.end();
    }
  });

  router.put('/api/seahawk', function(req, res){
    debug('PUT /api/seahawk');
    console.log(req.body);

    if (req.url.query.id) {
      storage.fetchHawk('hawk', req.url.query.id)
      .then(hawk => {
        if(req.body.name) hawk.name = req.body.name;
        if(req.body.pos) hawk.pos = req.body.pos;
        if(req.body.round) hawk.round = req.body.round;
        storage.createHawk('hawk', hawk);
        res.writeHead(202, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(hawk));
        res.end();
      })
      .catch(err => {
        console.log(err);
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

  router.delete('/api/seahawk', function(req, res){
    debug('DELETE /api/seahawk');
    if(req.url.query.id) {
      storage.deleteHawk('hawk', req.url.query.id)
      .then(id => {
        console.log(id, 'deleted');
        res.writeHead(204, {'Content-Type': 'text/plain'});
        res.end();
      })
      .catch(err => {
        console.log(err);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('hawk not found');
        res.end();
      });
      return;
    }
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  });
};
