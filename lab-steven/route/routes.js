'use strict';

const Seahawk = require('../model/seahawk');
const hawkCtrl = require('../controller/hawk-controller');

module.exports = function(router){
  router.get('/api/seahawk/:id', function(req, res){
    hawkCtrl.fetchHawk('hawk', req.params.id)
    .then(hawk => res.json(JSON.stringify(hawk)))
    .catch(err => res.status(404).send(err.message));
  });

  router.post('/api/seahawk', function(req, res){
    let hawk = new Seahawk(req.body.name, req.body.pos, req.body.round);
    hawkCtrl.createHawk('hawk', hawk)
    .then(hawk => res.json(JSON.stringify(hawk)))
    .catch(err => res.status(400).send(err.message));
  });

  router.put('/api/seahawk/:id', function(req, res){
    hawkCtrl.updateHawk('hawk', req.params.id, req.body)
    .then(hawk => res.json(JSON.stringify(hawk)))
    .catch(err => res.status(404).send(err.message));
  });

  router.delete('/api/seahawk/:id', function(req, res){
    hawkCtrl.deleteHawk('hawk', req.params.id)
    .then(() => res.sendStatus(204))
    .catch(err => res.status(404).send(err.message));
  });
};
