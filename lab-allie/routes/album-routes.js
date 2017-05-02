'use strict';

const Album = require('../model/albums.js');
const albumCtrl = require('../controller/album-controller.js');

module.exports = function(router) {
  router.post('/api/album', (req, res) => {
    let album = new Album(req.body.artist, req.body.title, req.body.year, req.body.dateCreated);
    console.log('in router.post');
    
    albumCtrl.createAlbum('album', album)
    .then(album => res.json(JSON.stringify(album)))
    .catch(err => res.send(err));
  });
  
  router.get('/api/album/:id', (req, res) => {
    console.log('in router.get');
    albumCtrl.fetchAlbum('album', req.params.id)
    .then(data => req.json(JSON.stringify(data.toString())))
    .catch(err => res.send(err));
  });
  
  router.put('/api/album/:id', (req, res) => {
    albumCtrl.fetchAlbum('album', req.params.id)
    .then(data => req.json(JSON.stringify(data.toString())))
    .catch(err => res.send(err))
    .then(
      albumCtrl.createAlbum('album', req.body) //not sure if i need req.body.artist, req.body.title, etc.
      .then(album => res.json(JSON.stringify(album)))
      .catch(err => res.send(err))
    );
    console.log('in router.put');
  });
  
  router.delete('/api/album/:id', (req, res) => {
    albumCtrl.removeAlbum('album', req.params.id)
    .catch(err => res.send(err));
    console.log('in router.delete');
  });
};