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
    albumCtrl.fetchAlbum('note', req.params.id)
    .then(data => req.json(JSON.stringify(data.toString)))
    .catch(err => res.send(err));
  });
};