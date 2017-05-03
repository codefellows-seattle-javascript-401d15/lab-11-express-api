'use strict';

const Planet = require('../model/planet');
const planetCrtl = require('../controller/planet-controller');

module.exports = function(router) {
  router.post('/api/planet', (req, res) => {
    let planet = new Planet(req.body.name, req.body.universe);
    planetCrtl.createItem('planet', planet)
      .then(() => res.json(JSON.stringify(planet)))
      .catch(err => res.status(400).send(err));
  });

  router.get('/api/planet/:id', (req,res) => {
    planetCrtl.fetchItem('planet', req.params.id)
      .then(data => res.json(data.toString()))
      .catch(err => res.status(400).send(err));
  });

  router.put('/api/planet/:id', (req,res) => {
    let planet = new Planet(req.body.name, req.body.universe);
    planetCrtl.updateItem('planet', req.params.id, planet)
      .then(() => res.json(JSON.stringify(planet)))
      .catch(err => res.send(err));
  });

  router.delete('/api/planet/:id', (req,res) => {
    planetCrtl.deleteItem('planet', req.params.id)
      .then(() => res.send(`It's as if millions of voices suddenly cried out in terror, and were suddenly silenced.`))
      .catch(err => res.send(err));
  });
};
