const users = require('../MOCK_DATA.json');
const fs = require('fs');

function saveUsersToFile(users, res, successMessage) {
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).send('Error saving data to file');
        }
        // Send the response after the file has been successfully updated
        res.send(successMessage);
    });
}

const handlerGetAllUsers = (req, res) => {
    res.send(users);
}

const handlerGetUserById = (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    if (!user) {
        // Return 404 response if user is not found
        return res.status(404).send(`User with ID: ${id} not found.`);
    }
    res.send(user);
}

const handlerAddUser = (req, res) => {
    const newUser = req.body;
    // Check if required fields are present
    if (!newUser || !newUser.first_name || !newUser.last_name || !newUser.email || !newUser.gender) {
        return res.status(400).send('Missing required fields'); // 400 show it as bad request because of lack or incorrect data 
    }
    users.push({ id: users.length + 1, ...newUser });
    res.status(201);  // Show that new resource created
    saveUsersToFile(users, res, `New user added with ID: ${users.length}`);
}

const handlerUpdateUserById = (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    if (!user) {
        // Return 404 response if user is not found
        return res.status(404).send(`User with ID: ${id} not found.`);
    }
    user.email = req.body.email || user.email;
    saveUsersToFile(users, res, `User with ID: ${id} updated successfully.`);
}

const handlerDeleteUserById = (req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    users.splice(userIndex, 1);// Remove the user from the array
    saveUsersToFile(users, res, `Deleted the user with ID : ${id}`);
}

module.exports = { handlerGetAllUsers, handlerGetUserById, handlerAddUser, handlerUpdateUserById, handlerDeleteUserById };