const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7769131",
  password: "YAD7I65hy2",
  database: "sql7769131",
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

db.query("CREATE TABLE IF NOT EXISTS entries (id INT AUTO_INCREMENT PRIMARY KEY, person VARCHAR(255), description VARCHAR(255), amount DECIMAL(10, 2), date VARCHAR(255))", (err, result) => {
  if (err) throw err;
  console.log("Table created or already exists");
});

app.post('/entries', (req, res) => {
  const { person, description, amount, date } = req.body;
  db.query("INSERT INTO entries (person, description, amount, date) VALUES (?, ?, ?, ?)", [person, description, amount, date], (err, result) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send({ id: result.insertId, person, description, amount, date });
  });
});

app.get('/entries', (req, res) => {
  db.query("SELECT * FROM entries", (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send(rows);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});