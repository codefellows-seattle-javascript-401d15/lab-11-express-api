'use strict';

const Doge = require('../model/doge');
const dogeCtrl = require('../lib/storage');
const jsonParser = require('body-parser').json();

module.exports = function(router) {
  router.post('/api/doge', jsonParser, (req,res) => {
    let dog = new Doge(req.body.name, req.body.type, req.body.color);
    dogeCtrl.createItem('doge', dog)
    .then(() => res.json(JSON.stringify(dog)))
    .catch(err => res.send(err));
  });

  router.get('/api/doge/:id', (req,res) => {
    dogeCtrl.fetchItem('doge',req.params.id)
    .then(data => res.json(JSON.stringify(data.toSting())))
    .catch(err => res.send(err));
  });

  router.put('/api/doge',(req,res) => {
    dogeCtrl.updateItem('doge', req.body)
    .then(data => res.json(data))
    .catch(err => res.status(404).send(err.message));
  });
  router.delete('/api/doge/:id',(req,res) => {
    dogeCtrl.deleteItem('doge', req.params.id)
    .then(data => res.json(data))
    .catch(err => res.status(404).send(err.message));
  });
};
