const express = require('express');
const path = require('path');
const app = express();

// Allow the server to receive JSON
app.use(express.json());

// Serve HTML, CSS, and JavaScript files
app.use(express.static(path.join(__dirname, 'public')));

// Initial Premier League teams
const teams = [
    { id: 1, name: 'Arsenal', stadium: 'Emirates Stadium', city: 'London' },
    { id: 2, name: 'Liverpool', stadium: 'Anfield', city: 'Liverpool' },
    { id: 3, name: 'Chelsea', stadium: 'Stamford Bridge', city: 'London' }
];

// ID for the next new team
let nextId = 4;

// GET - Return all teams
app.get('/api/teams', (req, res) => {
    res.send(teams);
});

// GET - Return a team by ID
app.get('/api/teams/:id', (req, res) => {
    const team = teams.find(t => t.id === parseInt(req.params.id));

    if (!team) return res.status(404).send('Team not found');

    res.send(team);
});

// POST - Create a new team
app.post('/api/teams', (req, res) => {
    if (!req.body || !req.body.name || !req.body.stadium || !req.body.city) {
        return res.status(400).send('Please provide all fields');
    }

    const team = {
        id: teams.length + 1,
        name: req.body.name,
        stadium: req.body.stadium,
        city: req.body.city
    };

    teams.push(team);
    res.send(team);
});

// PUT - Update an existing team
app.put('/api/teams/:id', (req, res) => {
    const team = teams.find(t => t.id === parseInt(req.params.id));

    if (!team) return res.status(404).send('Team not found');

    if (!req.body || !req.body.name || !req.body.stadium || !req.body.city) {
        return res.status(400).send('Please provide all fields');
    }

    team.name = req.body.name;
    team.stadium = req.body.stadium;
    team.city = req.body.city;

    res.send(team);
});

// DELETE - Remove a team by ID
app.delete('/api/teams/:id', (req, res) => {
    const team = teams.find(t => t.id === parseInt(req.params.id));

    if (!team) return res.status(404).send('Team not found');

    const index = teams.indexOf(team);
    teams.splice(index, 1);

    res.send(team);
});

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
