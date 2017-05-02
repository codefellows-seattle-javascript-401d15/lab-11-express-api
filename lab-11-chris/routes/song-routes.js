'use strict';

const storage = require('../lib/storage');
const Song = require('../model/song');
const debug = require('debug')('http:server');
const path = ('./data/json-storage');
const fs = require('fs');


module.exports = function(router) {
  router.get('/api/song', (req, res) => {
    debug('GET /api/song');
    let idPath = `${path}/${req.query.id}.json`;
    if(req.query.id) {
      fs.readFile(idPath, (err, data) => {
        if(err) {
          console.error(err.message);
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.write('BAD REQUEST');
          res.end();
        }

        data = JSON.parse(data);
        res.json(data);
      });
    }

  });

  router.post('/api/song', (req, res) => {
    debug('POST /api/song');
    try {
      let newSong = new Song(req.body.title, req.body.artist, req.body.album);

      storage.createItem('song', newSong)
      .then(newSong => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(newSong));
        res.end();
      });
    } catch(e) {

      console.error(e);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('BAD REQUEST');
      res.end();
    }
  });

  router.put('/api/song', (req, res) => {
    debug('PUT /api/song');
    let idPath = `${path}/${req.query.id}.json`;
    if(req.query.id) {
      fs.readFile(idPath, (err, data) => {
        if(err) {
          console.error(err.message);
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.write('BAD REQUEST');
          res.end();
        }
        data = JSON.parse(data);
        res.json(data);

        console.log(data.title);
      });
    }
  });

  router.delete('/api/song', (req, res) => {
    debug('DELETE /api/song');
    if(req.url.query.id) {
      storage.deleteItem('song', req.url.query.id)
      .then(() => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write('deleted record');
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('BAD REQUEST');
        res.end();
      });
      return;
    }
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('NOT FOUND');
    res.end();
  });

};
