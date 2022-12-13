const api = require('express').Router();

const { readFromFile, readAndAppend, writeToFile } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");


// GET /api/notes should read the db.json file and return all saved notes as JSON.
api.get('/notes', (req,res) => {
    console.log(`${req.method} request received for api/notes`);
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));  
})

// POST /api/notes should receive a new note to save on the request body, add it to 
// the db.json file, and then return the new note to the client. 
api.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);

    const { title, text } = req.body;

    if(req.body) {
        const newNote = {
            title,
            text,
            id: uuid()
        };

        readAndAppend(newNote, './db/db.json');
        res.json('note added successfully');
    } else {
        res.error('Error in adding new note')
    }
});

// GET Route for a specific note
api.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const noteArray = json.filter((note) => note.id === noteId);
        return noteArray.length > 0
          ? res.json(noteArray)
          : res.json('No note with that ID');
      });
  });

// DELETE /api/notes/:id should receive a query parameter that contains the id
// of a note to delete. To delete a note, you'll need to read all notes from 
// the db.json file, remove the note with the given id property, and then rewrite
// the notes to the db.json file.
api.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const noteArray = json.filter((note) => note.id !== noteId);

        writeToFile('./db/db.json', noteArray);

        res.json(`Note ${noteId} has been deleted`);
    });
})


module.exports = api