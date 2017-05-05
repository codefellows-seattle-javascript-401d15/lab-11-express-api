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
    .then(data => res.json(JSON.stringify(data.toString())));
  });

  // router.put('/api/note', )
  //
  router.delete('/api/note', (req, res) => {
    noteCtrl.deleteNote('note', req.params.id)
    .then(data => res.json(JSON.stringify(data.toString())));
  });
};
