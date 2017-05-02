'use strict';

const FoodItem = require('../model/food.js');
const foodController = require('../controller/storage');


module.exports = function(router) {
  // router.get('/api/food', function(req, res) {
  //   if(req.url.query.id) {
  //     storage.fetchItem('food', req.url.query.id)
  //     .then(food => {
  //       res.writeHead(201, {'Content-Type': 'application/json'});
  //       res.write(JSON.stringify(food));
  //       res.end();
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       res.writeHead(404, {'Content-Type': 'text/plain'});
  //       res.write('not found');
  //       res.end();
  //     })
  //     return;
  //   }
  //   res.writeHead(400, {'Content-Type': 'text/plain'})
  //   res.write('bad request');
  //   res.end();
  // })

  router.post('/api/food', (req, res) => {
    let food = new FoodItem(req.body.name, req.body.type, req.body.cost);

    foodController.createItem('food', food)
    .then(() => res.json(JSON.stringify(food)))
    .catch( error => {
      console.error(error);
      res.send(error);
    });
  });

  // router.delete('api/food', function(req, res) {
  //   if(req.url.query.id) {
  //     storage.deleteItem('food', req.url.query.id)
  //     .then(id => {
  //       res.writeHead(204, {'Content-Type': 'application/json'});
  //       res.end();
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       res.writeHead(404, {'Content-Type': 'text/plain'});
  //       res.write('not found');
  //       res.end();
  //     });
  //     return;
  //   }
  //   res.writeHead(400, {'Content-Type': 'text/plain'});
  //   res.write('bad request');
  //   res.end();
  // });
  //
  // router.put('api/food', function(req, res) {
  //   if(req.body.id) {
  //     storage.updateItem('food',  req.body.id, req.body)
  //     .then(() => {
  //       res.writeHead(202, {'Content-Type': 'application/json'});
  //       res.write('Updated!');
  //       res.end();
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       res.writeHead(404, {'Content-Type': 'text/plain'});
  //       res.write('not found');
  //       res.end();
  //     });
  //     return;
  //   }
  //
  //   res.writeHead(400, {'Content-Type': 'text/plain'});
  //   res.write('bad request');
  //   res.end();
  // });
};
