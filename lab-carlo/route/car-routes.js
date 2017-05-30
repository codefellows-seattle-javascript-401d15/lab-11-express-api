'use strict';

const Router = require('express').Router;
const storage = require('../lib/storage');
const Automobile = require('../model/cars');
const autoRouter = module.exports = new Router();

autoRouter.post('/api/auto', (req, res) => {
  let auto = new Automobile(req.body.make, req.body.model);
  storage.createCar('auto', auto)
  .then(() => res.json(JSON.stringify(auto)))
  .catch(err => {
    console.error(err);
    res.status(400).send(err.message);
  });
});

autoRouter.get('/api/auto/:id', (req, res) => {
  storage.fetchCar('auto', req.params.id)
  .then(auto => res.json((auto.toString())))
  .catch(err => {
    console.error(err);
    res.status(404).send(err.message);
  });
});

autoRouter.delete('/api/auto/:id', (req, res) => {
  storage.fetchDelete('auto', req.params.id)
  .then(() => res.sendStatus(202))
  .catch(err => {
    res.send(err);
  });
});

autoRouter.put('/api/auto', (req,res) => {
  storage.fetchPut('auto', req.body)
  .then(data => res.json(data))
  .catch(err => res.status(404).send(err.essage));
});

// autoRouter.put('/api/auto', function(req, res) {
//   console.log(req.body);
//   if(req.body.id){
//     try {
//       storage.fetchPut('auto',req.body.id, req.body)
//       .then(auto => {
//         res.writeHead(201, {'Content-Type': 'application/json'});
//         res.write(JSON.stringify(auto));
//         res.end();
//       });
//     } catch(e) {
//       console.error(e);
//       res.writeHead(400, {'Content-Type': 'text/plain'});
//       res.write('bad request');
//       res.end();
//     }
//   }
// });
