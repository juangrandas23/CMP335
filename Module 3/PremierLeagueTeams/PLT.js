
const express = require('express');
const app = express();

app.use(express.json());

const teams = [
    {
        id: 1,
        name: 'Arsenal',
        stadium: 'Emirates Stadium',
        city: 'London'
    },
    {
        id: 2,
        name: 'Liverpool',
        stadium: 'Anfield',
        city: 'Liverpool'
    },
    {
        id: 3,
        name: 'Chelsea',
        stadium: 'Stamford Bridge',
        city: 'London'
    }
];

app.get('/', (req, res) => {
    res.send('Welcome to Premier League Teams API!');
});

app.get('/api/teams', (req, res) => {
    res.send(teams);
});

app.get('/api/teams/:id', (req, res) => {
    const team = teams.find(t => t.id === parseInt(req.params.id));

    if (!team) return res.status(404).send('Team not found');

    res.send(team);
});

app.post('/api/teams', (req, res) => {
    if (!req.body || !req.body.name || !req.body.stadium || !req.body.city) {
        return res.status(400).send('Please provide name, stadium, and city');
    }

    const team = {
        id: teams.length > 0 ? Math.max(...teams.map(t => t.id)) + 1 : 1,
        name: req.body.name,
        stadium: req.body.stadium,
        city: req.body.city
    };

    teams.push(team);
    res.send(team);
});

app.put('/api/teams/:id', (req, res) => {
    const team = teams.find(t => t.id === parseInt(req.params.id));

    if (!team) return res.status(404).send('Team not found');

    if (!req.body || !req.body.name || !req.body.stadium || !req.body.city) {
        return res.status(400).send('Please provide name, stadium, and city');
    }

    team.name = req.body.name;
    team.stadium = req.body.stadium;
    team.city = req.body.city;

    res.send(team);
});

app.delete('/api/teams/:id', (req, res) => {
    const team = teams.find(t => t.id === parseInt(req.params.id));

    if (!team) return res.status(404).send('Team not found');

    const index = teams.indexOf(team);
    teams.splice(index, 1);

    res.send(team);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
