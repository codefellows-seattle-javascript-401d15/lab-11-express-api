'use strict';

const Weapon = require('../model/weapon');
const weapCtrl = require('../controller/weapon-controller');
const debug = require('debug')('http:server');
const jsonParser = require('body-parser').json();

module.exports = function(router) {
  router.post('/api/weapon', jsonParser, (req,res) => {
    debug('post /api/weapon');
    let weapon = new Weapon(req.body.name, req.body.details, req.body.price);
    weapCtrl.createItem('blueprint', weapon)
    .then(() => res.json(JSON.stringify(weapon)))
    .catch(err => res.send(err));
  });

  router.get('/api/weapon/:id', (req,res) => {
    weapCtrl.fetchItem('blueprint',req.params.id)
    .then(weapon => res.json(weapon.toString()))
    .catch(err => res.send(err));
  });

  router.put('/api/weapon/:id', (req,res) => {
    debug('PUT /api/weapon');

    weapCtrl.updateItem('blueprint', req.params.id, req.body)
    .then(weapon =>
      res.json(JSON.stringify(weapon.toString())
    ))
    .catch(err => res.send(err));
  });

  router.delete('/api/weapon/:id', (req,res) => {
    debug('DELETE /api/weapon');
    weapCtrl.deleteItem('blueprint',req.params.id)
    .then(weapon => res.json(JSON.stringify(weapon.toString())))
    .catch(err => res.send(err));
  });

};
