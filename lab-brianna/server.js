'use-strict';

const http = require('http');
const Router = require('./lib/router');
const storage = require('./lib/storage');
const Watch = require('./model/watch');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;

const router = new Router();
const server = module.exports = http.createServer(router.route());

router.get('/api/watch', function(req, res) {
  debug('GET /api/watch');
  if(req.url.query.id) {
    storage.fetchItem('watch', req.url.query.id)
    .then(watch => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(watch));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.write('bad request');
  res.end();
});

router.post('/api/watch', function(req, res) {
  debug('POST /api/watch');
  console.log(req.body);
  try {
    let watch = new Watch(req.body.brand, req.body.color, req.body.size);
    storage.createItem('watch', watch);

    //.then should go here
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(watch));
    res.end();
  } catch(e) {
    console.error(e);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  }
});

router.put('/api/watch', function(req, res) {
  debug('PUT /api/watch');
  if(req.body) {
    storage.updateItem('watch', req.body)
    .then(watch => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(watch));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.write('bad request');
  res.end();
});

router.delete('/api/watch', function(req, res) {
  debug('DELETE /api/watch');
  if (req.url.query.id) {
    storage.deleteItem('watch', req.url.query.id)
    .then(() => {
      res.writeHead(204, {'Content-Type': 'application/json'});
      res.write('delete successful');
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('not found');
      res.end();
    });
    return;
  }
  res.write(400, {'Content-Type': 'text/plain'});
  res.write('bad reqest');
  res.end();
});

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
