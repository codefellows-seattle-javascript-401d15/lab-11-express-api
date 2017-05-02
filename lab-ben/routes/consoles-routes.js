'use strict';

const Hardware = require('../model/consoles.js');
const hardwareCtrl = require('../controller/storage.js');

module.exports = function(router) {
  router.post('/api/consoles', (req, res) => {
    let hardware = new Hardware(req.body.name, req.body.manufacturer, req.body.releaseYear);
    hardwareCtrl.createItem('consoles', hardware)
    .then(() => res.json(JSON.stringify(hardware)))
    .catch(err => res.send(err));
  });

  router.get('/api/consoles/:id', (req, res) => {
    hardwareCtrl.fetchItem('consoles', req.params.id)
    .then(data => res.json(JSON.stringify(data.toString())))
    .catch(err => res.send(err));
  });

  router.put('/api/consoles/:id', (req, res) => {
    let hardware = new Hardware(req.body.name, req.body.manufacturer, req.body.releaseYear);
    hardwareCtrl.updateItem('consoles', req.params.id, hardware)
    .then(data => res.json(JSON.stringify(data)))
    .catch(err => res.send(err));
  });

  router.delete('/api/consoles', (req, res) => {
    hardwareCtrl.deleteItem('consoles', req.params.id)
    .then(() => res.send())
    .catch(err => res.send(err));
  });
};
