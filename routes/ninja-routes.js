'use strict';

const debug = require('debug')('http:ninja-routes');
const Ninja = require('../model/ninjas');
const crtlNinja = require('../controller/ninja-controller');

module.exports = function(router) {

  router.post('/api/ninja', (req, res) => {
    debug('#POST /api/ninja');
    let ninja = new Ninja(req.body.name, req.body.clan, req.body.weapons);

    crtlNinja.createItem('ninja', ninja)
    .then(() => res.json(JSON.stringify(ninja)))
    .catch(err => {
      console.error(err);
      res.send(err);
    });
  });

  router.get('/api/ninja/:id', (req, res) => {
    debug('#GET /api/ninja');
    crtlNinja.fetchItem('ninja', req.params.id)
    .then(data => res.json(JSON.stringify(data.toString())))
    .catch(err => res.send(err));
  });
};
