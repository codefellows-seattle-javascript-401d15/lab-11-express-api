'use strict';

const Lure = require('../model/lure');
const jsonParser = require('body-parser').json();
const lureCtrl = require('../controller/lure-controller.js');

module.exports = function(router) {
  router.post('/api/lure', (req, res) => {
    let lure = new Lure(req.body.name, req.body.type, req.body.targets, req.body.water, req.body.date, req.body.id);

    lureCtrl.createItem('lure', lure)
    .then(() => res.send(JSON.stringify(lure)))
    .catch(err => res.send(err));
  });

  router.get('/api/lure/:id', (req, res) => {
    lureCtrl.fetchItem('lure', req.params.id)
    .then(data => res.json(JSON.stringify(data.toString())))
    .catch(err => res.send(err));
  });

  router.put('/api/lure/:id', jsonParser, (req, res) => {
    let lure = new Lure(req.body.name, req.body.type, req.body.targets, req.body.water, req.body.date, req.body.id);

    lureCtrl.updateItem(req.params.id, req.body)
    .then(() => res.send(JSON.stringify(lure)))
    .catch(err => res.send(err));
  });

  router.delete('/api/lure/:id', (req, res) => {
    lureCtrl.deleteItem(req.params.id)
  .then( () => res.sendStatus(204))
  .catch(err => res.send(err));
  });
};
