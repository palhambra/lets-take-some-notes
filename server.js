const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const noteData = require('./db/db.json');

// npm package for unique id 
const { v4: uuidv4 } = require('uuid');


app.use(express.json())
app.use(express.urlencoded({ extended:true }));


app.use(express.static('public'));

//
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
});

app.get('/api/notes', (req, res) => {
  res.json(noteData)
});

app.post('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf8'))
  
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4()
  };

  notes.push(newNote);

  fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notes));

  res.json(newNote)
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`))
