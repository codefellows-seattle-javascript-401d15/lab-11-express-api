'use strict';

const catController = require('../controller/cat-controller');
const Cat = require('../model/cat');
const debug = require('debug')('http:cat-routes');


module.exports = function(router) {

  router.get('/api/cat/:id', function(req, res) {
    debug('GET /api/cat');
    if(req.params.id) {
      catController.fetchItem('cat', req.params.id)
      .then(data => {
        return res.json(JSON.stringify(data));
      })
      .catch(err => {
        return res.status(404).json(err);
      });
    }
  });
  router.post('/api/cat', function(req, res) {
    debug('POST /api/cat');
    let cat = new Cat(req.body.name, req.body.mood);
    catController.createItem('cat', cat)
    .then(() => res.json(JSON.stringify(cat)))
    .catch(err => res.send(err));
  });
  router.delete('/api/cat/:id', function(req, res) {
    debug('DELETE /api/cat');
    if(req.params.id) {
      catController.deleteItem('cat', req.params.id)
      .then(() => res.sendStatus(204))
      .catch(err => res.send(err));
    }
  });
  router.put('/api/cat/:id', function(req, res) {
    debug('PUT /api/cat');
    if(req.params.id) {
      catController.updateItem('cat', req.params.id, req.body.name, req.body.mood)
      .then(() => res.send('update sucessful'))
      .catch(err => {
        return res.status(400).json(err);
      });
    }
  });
};
