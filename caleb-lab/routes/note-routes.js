'use strict';

const debug = require('morgan');
const Note = require('../model/note.js');
const noteCtrl = require('../controllers/note-controller.js');
const jsonParser = require('body-parser').json();

// const router = express.Router();

module.exports = function(router){

  router.get('/api/note/:id', (req, res) => {
    debug('#GET');

    noteCtrl.fetchNote('note', req.params.id)
    .then(data => res.json(JSON.stringify(data.toString())))
    .catch(err => res.send(err));
  });

  router.post('/api/note', jsonParser, (req, res) => {
    debug('#POST');
    let note = new Note(req.body.name, req.body.details, req.body.date);

    noteCtrl.createNote('note', note)
    .then(note => res.json(JSON.stringify(note)))
    .catch(err => res.send(err));
  });

  router.put('/api/note/:id', jsonParser, (req, res) => {
    debug('#PUT');

    noteCtrl.updateNote('note', req.body)
    .then(note => res.json(JSON.stringify(note)))
    .catch(err => res.send(err));
  });
};
