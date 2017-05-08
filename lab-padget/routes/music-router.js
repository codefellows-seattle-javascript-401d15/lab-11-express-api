'use strict';

// require debug module function and call it.
const debug = require('debug')('http:music-router');
const Music = require('../model/music');
const storage = require('../lib/storage');

// pass ?id=<uuid> in the query string to retrieve a specific resource as json. registering an endpoint and callback.
module.exports = function(router) {

  // GET

  // router is the instance, get is the method.
  router.get('/api/music', function(req, res) {
    debug('GET /api/music');
    // checking if get request has an id key and value.
    if(req.url.query.id) {
      // pass schema name and id.
      storage.fetchItem('music', req.url.query.id)
      // return value is a promise.
      .then(music => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        // sending json as the content type.
        res.write(JSON.stringify(music));
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
    // if no id property, then bad request, no id was sent.
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  });

  // POST

  // pass data as stringifed json in the body of a post request to create a resource.
  router.post('/api/music', function(req, res) {
    debug('POST /api/music');
    // instantiate new object, assign to music, pass schema name and object. try/catch will immediately execute.
    try {
      let music = new Music(req.body.artist, req.body.album, req.body.song);
      // see promise in storage.js
      storage.createItem('music', music)
      // then/catch is waiting for promise to resolve/reject.
      .then(Music => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(Music));
        res.end();
      });
    } catch(e) {
      console.error(e);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request');
      res.end();
    }
  });

  // PUT

  // pass data as stringified json in the body of a put request to update a resource.
  router.put('/api/music', function(req, res) {
    debug('PUT /api/music');
    storage.putItem('music', req.body.id, req.body) // grab the object with the properties
    .then(music => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(music));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('not found');
      res.end();
    });
    return;
  });

  // DELETE

  // pass an ?id=<uuid> in the query string to delete a specific resource should return 204 status with no content in the body.
  router.delete('/api/music', function(req, res) {
    debug('DELETE /api/music');
    if(req.url.query.id) {
      storage.deleteItem('music', req.url.query.id)
      .then(() => {
        res.writeHead(204, {'Content-Type': 'application/json'});
        res.write('delete successful');
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
// closes module.exports
};
