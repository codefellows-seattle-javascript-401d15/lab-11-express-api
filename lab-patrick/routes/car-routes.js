'use strict';

const Car = require('../model/car');
const Router = require('express').Router;
const carCtrl = require('../controller/car-controller');

const carRouter = module.exports = new Router();

carRouter.post('/api/car', (req, res) => {
  let car = new Car(req.body.name, req.body.model, req.body.horsepower);
  carCtrl.createItem('car', car)
  .then(() => res.json(JSON.stringify(car)))
  .catch(err =>{
    res.status(400).send(err.message);
  });
});

carRouter.get('/api/car/:id', (req, res)=>{
  carCtrl.fetchItem('car', req.params.id)
  .then(data => res.json(data.toString()))
  .catch(err => res.status(400).send(err.messgae));
});

carRouter.put('/api/car', (req, res)=> {
  carCtrl.updateItem('car', req.body)
  .then(data => res.json(data))
  .catch(err => res.status(404).send(err.message));
});

carRouter.delete('/api/car/:id', (req, res)=>{
  carCtrl.deleteItem('car', req.params.id)
  .then(()=> res.sendStatus(204))
  .catch(err => res.status(404).send(err.message));
});
