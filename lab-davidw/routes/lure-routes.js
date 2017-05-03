'use strict';

const Lure = require('../model/lure');
const jsonParser = require('body-parser').json();
const lureCtrl = require('../controller/lure-controller.js');
const cors = require('../lib/cors');

module.exports = function(router) {
  router.post('/api/lure', cors, jsonParser, (req, res) => {
    let lure = new Lure(req.body);

    lureCtrl.createItem('lure', lure)
    .then(() => res.send(JSON.stringify(lure)))
    .catch(err => {
      console.error(err);
      res.status(400).send(err.message);
    });
  });

  router.get('/api/lure/:id', cors, (req, res) => {
    lureCtrl.fetchItem('lure', req.params.id)
    .then(data => res.json(data.toString()))
    .catch(err => res.status(404).send(err.message));
  });

  router.put('/api/lure',(req, res) => {
    lureCtrl.updateItem('lure', req.body)
    .then(data => res.json(data))
    .catch(err => res.status(404).send(err.message));
  });

  router.delete('/api/lure/:id', cors, (req, res) => {
    lureCtrl.deleteItem(req.params.id)
  .then( () => res.sendStatus(204))
  .catch(err => res.send(err));
  });
};
