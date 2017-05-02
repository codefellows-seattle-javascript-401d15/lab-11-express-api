'use strict';

const Pokemon = require('../model/pokemon');
const pokemonCtrl = require('../controller/pokemon-controller');

module.exports = function(router) {
  router.post('/api/pokemon', (req, res) => {
    let pokemon = new Pokemon(req.body.name, req.body.type);
    pokemonCtrl.createPokemon('pokemon', pokemon)
    .then(pokemon => res.json(JSON.stringify(pokemon)))
    .catch(err => res.send(err));
  });

  router.get('/api/pokemon/:id', (req, res) => {
    pokemonCtrl.fetchPokemon('pokemon', req.params.id)
    .then(data => res.json(data.toString()))
    .catch(err => res.send(err));
  });

  router.put('/api/pokemon/:id', (req, res) => {
    pokemonCtrl.updatePokemon('pokemon', req.params.id, req.body)
    .then(pokemon => {
      res.json(JSON.stringify(pokemon));
    })
    .catch(err => res.send(err));
  });

  router.delete('/api/pokemon/:id', (req, res) => {
    pokemonCtrl.deletePokemon('pokemon', req.params.id)
    .then(() => res.send('Pokemon deleted'))
    .catch(err => res.send(err));
  });
};
