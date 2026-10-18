const express = require('express');
const app = express();

// Allow the application to receive JSON data
app.use(express.json());

// Create the initial Premier League to-do list
const todos = [
    {
        id: 1,
        description: 'Watch Arsenal match',
        dueDate: '2026-10-17',
        completed: false
    },
    {
        id: 2,
        description: 'Analyze Liverpool tactics',
        dueDate: '2026-10-18',
        completed: false
    },
    {
        id: 3,
        description: 'Review Chelsea highlights',
        dueDate: '2026-10-12',
        completed: true
    },
    {
        id: 4,
        description: 'Check Manchester City lineup',
        dueDate: '2026-10-20',
        completed: false
    },
    {
        id: 5,
        description: 'Research Manchester United players',
        dueDate: '2026-10-22',
        completed: false
    }
];

// GET: Display a welcome message
app.get('/', (req, res) => {
    res.send('Welcome to Premier League To-Do API!');
});

// GET: Retrieve all to-do tasks
app.get('/api/todos', (req, res) => {
    res.send(todos);
});

// GET: Find a specific task by its ID
app.get('/api/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));

    // Return 404 if the task does not exist
    if (!todo) return res.status(404).send('Task not found');

    res.send(todo);
});

// POST: Create a new to-do task
app.post('/api/todos', (req, res) => {
    const todo = {
        // Generate a unique ID for the new task
        id: Math.max(0, ...todos.map(t => t.id)) + 1,
        description: req.body.description,
        dueDate: req.body.dueDate,
        completed: false
    };

    // Add the new task to the list
    todos.push(todo);
    res.send(todo);
});

// PUT: Update an existing task
app.put('/api/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));

    // Return 404 if the task does not exist
    if (!todo) return res.status(404).send('Task not found');

    // Update the task information
    todo.description = req.body.description;
    todo.dueDate = req.body.dueDate;
    todo.completed = req.body.completed;

    res.send(todo);
});

// DELETE: Remove a task from the list
app.delete('/api/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));

    // Return 404 if the task does not exist
    if (!todo) return res.status(404).send('Task not found');

    // Find the task position and remove it
    const index = todos.indexOf(todo);
    todos.splice(index, 1);

    res.send(todo);
});

// Set the port and start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
