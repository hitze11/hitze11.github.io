// filepath: c:\Users\ronny\workspace\ronnyhalle\backend\server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE entries (id INTEGER PRIMARY KEY, person TEXT, description TEXT, amount REAL, date TEXT)");
});

app.post('/entries', (req, res) => {
  const { person, description, amount, date } = req.body;
  db.run("INSERT INTO entries (person, description, amount, date) VALUES (?, ?, ?, ?)", [person, description, amount, date], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send({ id: this.lastID, person, description, amount, date });
  });
});

app.get('/entries', (req, res) => {
  db.all("SELECT * FROM entries", [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send(rows);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});