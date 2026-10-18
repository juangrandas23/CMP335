const express = require('express');
const app = express();

// Allow Express to read JSON data
app.use(express.json());

// Store the available courses
const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
    { id: 4, name: 'course4' },
    { id: 5, name: 'course5' }
];

// Display a welcome message
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// GET: Display all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// GET: Find a course by its ID
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found');
    res.send(course);
});

// POST: Add a new course
app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// PUT: Update an existing course
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found');
    course.name = req.body.name;
    course.
    res.send(course);
});

// DELETE: Remove a course by its ID
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found');
    courses.splice(courses.indexOf(course), 1);
    res.send(course);
});

// Start the server on port 3000
app.listen(3000, () => console.log('Listening on port 3000...'));