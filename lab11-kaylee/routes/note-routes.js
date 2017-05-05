'use strict';

const Note = require('../model/note');
const noteCtrl = require('../controller/note-controller');

module.exports = function(router) {

  router.post('/api/note', (req, res) => {
    let note = new Note(req.body.name, req.body.date);
    noteCtrl.createNote('note', note)
    .then(() => res.json(JSON.stringify(note)))
    .catch(err => res.send(err));
  });

  router.get('/api/note/:id', (req, res) => {
    noteCtrl.fetchNote('note', req.params.id)
    .then(data => res.json(JSON.parse(data.toString())))
    .catch(err => res.send(err));
  });

  router.put('/api/note/:id', (req, res) => {
    let newNote = new Note(req.body.name, req.body.date);
    noteCtrl.updateNote('note', req.params.id, newNote)
    .then(() => res.json(JSON.stringify(newNote)))
    .catch(err => res.send(err));
  });

  router.delete('/api/note/:id', (req, res) => {
    noteCtrl.deleteNote('note', req.params.id)
    .then(() => res.send('Note successfully deleted'))
    .catch(err => res.send(err));
  });
};
