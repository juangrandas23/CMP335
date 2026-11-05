const express = require('express');
const mysql = require('mysql2');

// Create the Express application
const app = express();

// Allow the server to receive JSON data from Postman
app.use(express.json());

// Connect to our MySQL database
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "customerdb"
});

// Check if the connection to MySQL works
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL!");
});


// GET - Return all teams
app.get('/api/teams', (req, res) => {

    // Select all teams from the database
    let sql = "SELECT * FROM teams";

    // Execute the SQL query
    con.query(sql, function(err, result) {

        // Send an error message if something goes wrong
        if (err) {
            return res.status(500).send("Database error");
        }

        // Send all teams back to Postman
        res.send(result);
    });
});


// GET - Return a team by ID
app.get('/api/teams/:id', (req, res) => {

    // Find a specific team using its ID
    let sql = "SELECT * FROM teams WHERE id = ?";

    // Use the ID provided in the URL
    con.query(sql, [req.params.id], function(err, result) {

        // Check for database errors
        if (err) {
            return res.status(500).send("Database error");
        }

        // Check if the team exists
        if (result.length === 0) {
            return res.status(404).send("Team not found");
        }

        // Return the team that was found
        res.send(result[0]);
    });
});


// POST - Create a new team
app.post('/api/teams', (req, res) => {

    // Make sure all required fields are provided
    if (!req.body || !req.body.name || !req.body.stadium || !req.body.city) {
        return res.status(400).send("Please provide all fields");
    }

    // SQL query to insert a new team
    let sql = "INSERT INTO teams (name, stadium, city) VALUES (?, ?, ?)";

    // Get the team information from Postman
    let values = [
        req.body.name,
        req.body.stadium,
        req.body.city
    ];

    // Insert the new team into MySQL
    con.query(sql, values, function(err, result) {

        // Check for database errors
        if (err) {
            return res.status(500).send("Database error");
        }

        // Create an object with the new team's information
        // MySQL automatically generates the ID
        let team = {
            id: result.insertId,
            name: req.body.name,
            stadium: req.body.stadium,
            city: req.body.city
        };

        // Return the new team
        res.status(201).send(team);
    });
});


// PUT - Update an existing team
app.put('/api/teams/:id', (req, res) => {

    // Make sure all fields are provided
    if (!req.body || !req.body.name || !req.body.stadium || !req.body.city) {
        return res.status(400).send("Please provide all fields");
    }

    // SQL query to update a team using its ID
    let sql = "UPDATE teams SET name = ?, stadium = ?, city = ? WHERE id = ?";

    // Get the new information and the team ID
    let values = [
        req.body.name,
        req.body.stadium,
        req.body.city,
        req.params.id
    ];

    // Execute the UPDATE query
    con.query(sql, values, function(err, result) {

        // Check for database errors
        if (err) {
            return res.status(500).send("Database error");
        }

        // Check if the team was found
        if (result.affectedRows === 0) {
            return res.status(404).send("Team not found");
        }

        // Return the updated team information
        res.send({
            id: Number(req.params.id),
            name: req.body.name,
            stadium: req.body.stadium,
            city: req.body.city
        });
    });
});


// DELETE - Remove a team by ID
app.delete('/api/teams/:id', (req, res) => {

    // SQL query to delete a team using its ID
    let sql = "DELETE FROM teams WHERE id = ?";

    // Execute the DELETE query
    con.query(sql, [req.params.id], function(err, result) {

        // Check for database errors
        if (err) {
            return res.status(500).send("Database error");
        }

        // Check if the team exists
        if (result.affectedRows === 0) {
            return res.status(404).send("Team not found");
        }

        // Confirm that the team was deleted
        res.send("Team deleted successfully");
    });
});


// Start the Express server
const port = process.env.PORT || 3000;

// Listen for requests from Postman
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
