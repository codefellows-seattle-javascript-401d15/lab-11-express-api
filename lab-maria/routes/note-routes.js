'use strict';

const noteControl = require('../controller/note-controller');
const DeathNote = require('../model/death-note');

module.exports = function(router) {

  router.get('/api/note', (req, res) => {
    if(noteControl.noteArray.length === 0) {
      console.log('WTFSA');
      res.sendStatus(400);
      return;
    }
    if(req.body.id) {
      let pattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
      if(pattern.test(req.body.id)) {
        for(let i=0; i < noteControl.noteArray.length; i++) {
          if(req.body.id === noteControl.noteArray[i]) {
            console.log(noteControl.noteArray);
            noteControl.fetchNote('note', req.body.id)
            .then(data => res.json(JSON.stringify(data)))
            .catch(err => res.send(err.message));
            return;
          }
        }
      } else {
        res.sendStatus(400);
        return;
      }
    }
    noteControl.fetchAll('note')
    .then(data => {
      res.json(JSON.stringify(data));
    })
    .catch(err => res.send(err.message));
  });

  router.post('/api/note', (req, res) => {
    let note = new DeathNote(req.body.owner, req.body.shinigami, req.body.deathCount);
    noteControl.createNote('note', note)
    .then(() => res.json(JSON.stringify(note)))
    .catch(err => {
      console.error(err.message);
      res.send(err);
    });
  });
  router.put('/api/note', (req, res) => {
    if(req.body.id) {
      noteControl.updateNote('note', req.body.id, req.body)
      .then(data => {
        res.json(JSON.stringify(data));
      })
      .catch(err => res.send(err.message));
      return;
    }
    res.sendStatus(400);
  });

  router.delete('/api/note', (req, res) => {
    if(req.body.id) {
      noteControl.deleteNote('note', req.body.id)
      .then( () => res.sendStatus(200))
      .catch(err => res.send(err.message));
      return;
    } else {
      noteControl.deleteDir('note')
      .then(() => res.sendStatus(200))
      .catch(err => res.send(err.message));
    }
  });
};
