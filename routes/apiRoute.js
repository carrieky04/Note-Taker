const api = require('express').Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
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
            note_id: uuid()
        };

        readAndAppend(newNote, './db/db.json');
        res.json('note added successfully');
    } else {
        res.error('Error in adding new note')
    }
});

module.exports = api