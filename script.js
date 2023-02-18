const mysql = require('mysql');

// Create a connection to the JawsDB database
// const connection = mysql.createConnection(process.env.JAWSDB_URL);

var connection = mysql.createConnection({
    host: "c8u4r7fp8i8qaniw.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
    user: "l0oj7cmpddyd750c",
    password: "bpro1x7fa5qqu39i"
  });

// Connect to the database
connection.connect(function(err) {
  if (err) {
    console.error('Error connecting to database:', err.stack);
    return;
  }
  console.log('Connected to database!');
});

// Insert a new uniform item
const item = 'Uniform Shirt';
const size = 'Medium';
const available = true;
connection.query('INSERT INTO uniform (item, size, available) VALUES (?, ?, ?)', [item, size, available], function(err, result) {
  if (err) {
    console.error('Error inserting uniform item:', err.stack);
    return;
  }
  console.log('Inserted uniform item with id', result.insertId);
});

// Select all uniform items
connection.query('SELECT * FROM uniform', function(err, results) {
  if (err) {
    console.error('Error selecting uniform items:', err.stack);
    return;
  }
  console.log('Selected', results.length, 'uniform items');
  console.log(results);
});

// Update a uniform item's availability
const itemId = 1;
const newAvailable = false;
connection.query('UPDATE uniform SET available = ? WHERE id = ?', [newAvailable, itemId], function(err, result) {
  if (err) {
    console.error('Error updating uniform item:', err.stack);
    return;
  }
  console.log('Updated uniform item with id', itemId);
});

// Disconnect from the database
connection.end();
