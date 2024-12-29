const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json');

const app = express();


// Let's write requestTime middlware which add requestTime property in req object which further used in next function chain
const requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    next();
};
app.use(requestTime);

app.use((req, res, next) => {
    const log = `${req.requestTime} : ${req.url}\n`;
    fs.appendFile('log.txt', log, (err) => {
        if (err)
            console.error(`Error writing log: ${err}`);
        else
            console.log(`Log added - ${log}`);
    });
    next();
});

app.get('/users', (req, res) => {
    const html = `
    <ul> 
        ${users.map(user => `<li> ${user.first_name} </li>`).join(" ")}
    </ul>
    `
    res.send(html);
});

app.get('/api/users', (req, res) => {
    res.send(users);
});


function saveUsersToFile(users, res, successMessage) {
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).send('Error saving data to file');
        }
        // Send the response after the file has been successfully updated
        res.send(successMessage);
    });
}

app.use(express.urlencoded({ extended: false })); // This middlware set req.body
app.post('/api/users', (req, res) => {
    const newUser = req.body;
    // Check if required fields are present
    if (!newUser || !newUser.first_name || !newUser.last_name || !newUser.email || !newUser.gender) {
        return res.status(400).send('Missing required fields'); // 400 show it as bad request because of lack or incorrect data
    }
    users.push({ id: users.length + 1, ...newUser });
    res.status(201);  // Show that new resource created
    saveUsersToFile(users, res, `New user added with ID: ${users.length}`);
});

app.route('/api/users/:id')
    .all(function (req, res, next) {
        // runs for all HTTP methods
        // think of it as route specific middleware!
        console.log('/api/users/:id get delete patch method hit');
        next();
    })
    .get(function (req, res) {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        if (!user) {
            // Return 404 response if user is not found
            return res.status(404).send(`User with ID: ${id} not found.`);
        }
        res.send(user);
    })
    .delete(function (req, res) {
        const id = Number(req.params.id);
        // const updatedUsers = users.filter(user => user.id !== id);
        const userIndex = users.findIndex(user => user.id === id);
        users.splice(userIndex, 1);// Remove the user from the array
        saveUsersToFile(users, res, `Deleted the user with ID : ${id}`);
    })
    .patch(function (req, res) {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        if (!user) {
            // Return 404 response if user is not found
            return res.status(404).send(`User with ID: ${id} not found.`);
        }
        user.email = req.body.email || user.email;
        saveUsersToFile(users, res, `User with ID: ${id} updated successfully.`);
    });


// Handle unknown routes (404)
app.use((req, res) => {
    res.status(404).send('404 - Page Not Found');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});