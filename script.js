const express = require('express');
const mysql = require('mysql');

const app = express();

// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: 'c8u4r7fp8i8qaniw.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    user: 'l0oj7cmpddyd750c',
    password: 'bpro1x7fa5qqu39i',
    database: 'vb76cap954zn5e0e'
});

// Connect to the database
connection.connect((error) => {
    if (error) {
        console.error('Error connecting to the database: ' + error.stack);
        return;
    }

    console.log('Connected to the database.');
});

// Define the API endpoint that returns the list of uniform items in JSON format
app.get('/api/uniform', (req, res) => {
    connection.query('SELECT * FROM uniform', (error, results, fields) => {
        if (error) {
            console.error('Error retrieving uniform items: ' + error.stack);
            return res.status(500).json({ error: 'Error retrieving uniform items' });
        }

        res.json(results);
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});
