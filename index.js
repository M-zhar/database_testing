const express = require("express");
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Database connection
const db = mysql.createConnection({
   host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected');
});

app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/insert', (req, res) => {
  const { name, email,gender,EmployeeID, companyName, Position,joining_date,leaving_date, msg } = req.body;
  console.log('Received form data:', { name, email,gender,EmployeeID, companyName, Position,joining_date,leaving_date,  msg });

  const sql = 'INSERT INTO EmployeeData ( name, email,gender,EmployeeID, companyName, Position,joining_date,leaving_date,  msg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [ name, email,gender,EmployeeID, companyName, Position,joining_date,leaving_date, msg], (err, result) => {
    if (err) {
      console.error('Error occurred while inserting data:', err);
      res.status(500).send('Error occurred while inserting data');
    } else {
      console.log('Data inserted successfully');
      res.status(200).send('Data inserted successfully');
    }
  });
});
// Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
