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
    .then(data => res.json(JSON.stringify(data.toString())))
    .catch(err => res.send(err));
  });
};
