'use strict';

const Car = require('../model/vehicles.js');
const carContr = require('../controller/vehicle-controller.js');

module.exports = function(router){
  router.get('/api/car/:id', function(req, res){
    carContr.fetchCar('car', req.params.id)
    .then(data => res.json(data.toString()))
    .catch(err => res.send(err));
  });

  router.post('/api/car', function(req, res){
    let car = new Car(req.body.name, req.body.type, req.body.wheels, req.body.allWheelDrive);
    carContr.createCar('car', car)
    .then(car => res.json(car))
    .catch(err => res.send(err));
  });

  router.put('/api/car/:id', function(req, res){

    if(req.params.id){
      carContr.updateCar('car', req.body, req.params.id)
      .then((data) => res.json(data))
      .catch(err => res.status(404).send(err.message));
    }
  });

  router.delete('/api/car/:id', function(req, res){
    carContr.removeCar('car', req.params.id)
    .then(() => res.sendStatus(204))
    .catch(err => res.send(err));
  });
};
