'use strict';

const Planet = require('../model/planet');
const planetCrtl = require('../controller/planet-controller');

module.exports = function(router) {
  router.post('/api/planet', (req, res) => {
    let planet = new Planet(req.body.name, req.body.universe);
    planetCrtl.createItem('planet', planet)
      .then(() => res.json(JSON.stringify(planet)))
      .catch(err => res.send(err));
  });

  router.get('/api/planet/:id', (req,res) => {
    planetCrtl.fetchItem('planet', req.params.id)
      .then(data => res.json(JSON.stringify(data.toString())));
  });
};
