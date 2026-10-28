// API endpoint and team collection
const uri = '/api/teams';
let teams = [];

// GET - Get all teams
function getTeams() {
    fetch(uri)
        .then(response => {
            if (!response.ok) throw new Error('Unable to get teams');
            return response.json();
        })
        .then(data => displayTeams(data))
        .catch(error => console.error(error));
}

// POST - Add a new team
function addTeam(event) {
    event.preventDefault();

    // Get values from the add form
    const team = {
        name: document.getElementById('add-name').value.trim(),
        stadium: document.getElementById('add-stadium').value.trim(),
        city: document.getElementById('add-city').value.trim()
    };

    if (!team.name || !team.stadium || !team.city) {
        alert('Please complete all fields');
        return;
    }

    // Send the new team to the API
    fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(team)
    })
        .then(response => {
            if (!response.ok) throw new Error('Unable to add team');
            document.getElementById('add-form').reset();
            getTeams();
        })
        .catch(error => {
            console.error(error);
            alert('Error adding team');
        });
}

// Show the edit form with the selected team
function editTeam(id) {
    const team = teams.find(t => t.id === id);

    if (!team) return;

    document.getElementById('edit-id').value = team.id;
    document.getElementById('edit-name').value = team.name;
    document.getElementById('edit-stadium').value = team.stadium;
    document.getElementById('edit-city').value = team.city;

    document.getElementById('edit-section').style.display = 'block';
}

// PUT - Update an existing team
function updateTeam(event) {
    event.preventDefault();

    const id = document.getElementById('edit-id').value;

    // Get updated values from the edit form
    const team = {
        name: document.getElementById('edit-name').value.trim(),
        stadium: document.getElementById('edit-stadium').value.trim(),
        city: document.getElementById('edit-city').value.trim()
    };

    if (!team.name || !team.stadium || !team.city) {
        alert('Please complete all fields');
        return;
    }

    // Send updated information to the API
    fetch(`${uri}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(team)
    })
        .then(response => {
            if (!response.ok) throw new Error('Unable to update team');
            closeEdit();
            getTeams();
        })
        .catch(error => {
            console.error(error);
            alert('Error updating team');
        });
}

// DELETE - Remove a team
function deleteTeam(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) throw new Error('Unable to delete team');

            if (document.getElementById('edit-id').value === String(id)) {
                closeEdit();
            }

            getTeams();
        })
        .catch(error => {
            console.error(error);
            alert('Error deleting team');
        });
}

// Hide the edit form
function closeEdit() {
    document.getElementById('edit-section').style.display = 'none';
    document.getElementById('edit-form').reset();
}

// Display teams in the HTML table
function displayTeams(data) {
    const table = document.getElementById('teams');

    // Clear previous table rows
    table.innerHTML = '';

    // Create a row for each team
    data.forEach(team => {
        const row = table.insertRow();

        row.insertCell(0).textContent = team.id;
        row.insertCell(1).textContent = team.name;
        row.insertCell(2).textContent = team.stadium;
        row.insertCell(3).textContent = team.city;

        // Add Edit and Delete buttons
        const actions = row.insertCell(4);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTeam(team.id);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTeam(team.id);

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
    });

    // Save the latest team collection
    teams = data;
}

// Connect the forms and buttons
document.getElementById('add-form').addEventListener('submit', addTeam);
document.getElementById('edit-form').addEventListener('submit', updateTeam);
document.getElementById('cancel-button').addEventListener('click', closeEdit);

// Load teams when the page opens
getTeams();
