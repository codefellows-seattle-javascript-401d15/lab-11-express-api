'use strict';

const debug = require('morgan');
const Note = require('../model/note.js');
const noteCtrl = require('../controllers/note-controller.js');
const jsonParser = require('body-parser').json();
const cors = require('../lib/cors');

// const router = express.Router();

module.exports = function(router){

  router.get('/api/note/:id', (req, res) => {
    debug('#GET');

    noteCtrl.fetchNote('note', req.params.id)
    .then(data => res.json(data.toString()))
    .catch(err => res.status(400).send(err.message));
  });

  router.post('/api/note', (req, res) => {
    debug('#POST');
    let note = new Note(req.body.name, req.body.details, req.body.date);

    noteCtrl.createNote('note', note)
    .then(note => res.json(JSON.stringify(note)))
    .catch(err => res.status(400).send(err.message));
  });

  router.put('/api/note/', (req, res) => {
    debug('#PUT');
    noteCtrl.updateNote('note', req.body)
    .then(data => res.json(data))
    .catch(err => res.status(404).send(err.message));
  });

  router.delete('/api/note', (req, res) => {
    debug('#DELETE');
    noteCtrl.deleteNote('note', req.body)
    .then(()=>{
      return res.sendStatus(204);
    })
    .catch(err => res.status(404).send(err.message));
  });
};
