'use strict';

const Lure = require('../model/fishLure');
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
    .then(data => res.json(JSON.stringify(data.toString())));
  });
};
