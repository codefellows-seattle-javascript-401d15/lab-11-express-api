'use strict';

const FoodItem = require('../model/food.js');
const foodController = require('../controller/storage');


module.exports = function(router) {

  router.get('/api/food/:id', (req, res) => {
    foodController.fetchItem('food', req.params.id)
    .then( food => res.json(food.toString()))
    .catch(err => res.status(404).send(err));
  });

  router.post('/api/food', (req, res) => {
    let food = new FoodItem(req.body.name, req.body.type, req.body.cost);

    foodController.createItem('food', food)
    .then(() => res.json(JSON.stringify(food)))
    .catch( error => {
      console.error(error);
      res.send(error);
    });
  });

  router.delete('/api/food/:id', (req, res) => {
    foodController.deleteItem('food', req.params.id)
    .then( food => res.json(food.toString()))
    .catch(err => res.status(404).send(err));
  });

  router.put('/api/food/:id', (req, res) => {
    if(req.params.id) {
      foodController.updateItem('food', req.body, req.params.id)
      .then( food => res.json(JSON.stringify(food)))
      .catch(err => res.status(404).send(err));
    }
  });
};
