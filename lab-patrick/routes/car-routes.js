'use strict';

const Car = require('../model/car');
const Router = require('express').Router;
const carCtrl = require('../controller/car-controller');
const jsonParser = require('body-parser').json();
const carRouter = module.exports = new Router();

carRouter.post('/api/car', jsonParser, (req, res) => {
  let car = new Car(req.body.name, req.body.model, req.body.horsepower);
  carCtrl.createItem('car', car)
  .then(() => res.json(JSON.stringify(car)))
  .catch(err =>{
    res.send(err);
  });
});

carRouter.get('/api/car/:id', (req, res)=>{
  carCtrl.fetchItem('car', req.params.id)
  .then(data => res.json(data.toString()))
  .catch(err => {
    res.send(err);
  });
});

carRouter.put('api/car/:id', (req, res)=> {
  carCtrl.updateItem('car', req.params.id)
  .then(data => res.json(data.toString()))
  .catch(err => {
    res.send(err);
  });
});

carRouter.delete('/api/car/:id', (req, res)=>{
  carCtrl.deleteItem('car', req.params.id)
  .then(()=> res.sendStatus(202))
  .catch(err => {
    res.send(err);
  });
});
