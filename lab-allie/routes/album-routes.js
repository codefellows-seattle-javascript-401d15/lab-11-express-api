'use strict';

const Album = require('../model/albums.js');
const albumCtrl = require('../controller/album-controller.js');

module.exports = function(router) {
  router.post('/api/album', (req, res) => {
    let album = new Album(req.body.artist, req.body.title, req.body.year, req.body.dateCreated);
    
    albumCtrl.createAlbum('album', album)
    .then(album => res.json(JSON.stringify(album)))
    .catch(err => res.send(err));
  });
  
  router.get('/api/album/:id', (req, res) => {
    albumCtrl.fetchAlbum('album', req.params.id)
    .then(data => res.json(data.toString()))
    .catch(err => res.send(err));
  });
  
  router.put('/api/album/:id', (req, res) => {
    if(req.params.id) {
      albumCtrl.updateAlbum('album', req.body, req.params.id)
      .then(data => res.json(data))
      .catch(err => res.status(404).send(err.message));
    }
  });
  
  router.delete('/api/album/:id', (req, res) => {
    albumCtrl.removeAlbum('album', req.params.id)
    .catch(err => res.send(err));
  });
};