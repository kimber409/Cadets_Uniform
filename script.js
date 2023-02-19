const mysql = require('mysql');

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

// Define the new uniform item
const name = 'New Uniform Item';
const size = 'L';
const checked_out = false;

// Insert the new uniform item into the database
connection.query('INSERT INTO uniform (name, size, checked_out) VALUES (?, ?, ?)', [name, size, checked_out], (error, results, fields) => {
    if (error) {
        console.error('Error inserting uniform item: ' + error.stack);
        return;
    }

    console.log('Uniform item inserted successfully.');

    // Retrieve the list of uniform items from the database
    connection.query('SELECT * FROM uniform', (error, results, fields) => {
        if (error) {
            console.error('Error retrieving uniform items: ' + error.stack);
            return;
        }

        // Generate the HTML for the list of uniform items
        let html = '';
        results.forEach((item) => {
            html += '<div>' +
                '<h2>' + item.name + '</h2>' +
                '<p>Size: ' + item.size + '</p>' +
                '<p>Checked Out: ' + (item.checked_out ? 'Yes' : 'No') + '</p>' +
                '</div>';
        });

        // Insert the HTML into the page
        const uniformList = document.getElementById('uniform-list');
        uniformList.innerHTML = html;

        // Close the database connection
        connection.end();
    });
});
