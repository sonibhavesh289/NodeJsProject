const UserModel = require("../models/user");

const handlerGetAllUsers = async (req, res) => {
    const allUsers = await UserModel.find({});
    res.json(allUsers);
}

const handlerGetUserById = async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
        // Return 404 response if user is not found
        return res.status(404).send(`User with ID: ${req.params.id} not found.`);
    }
    res.json(user);
}

const handlerAddUser = async (req, res) => {
    const newUser = req.body;
    // Check if required fields are present
    if (!newUser || !newUser.first_name || !newUser.last_name || !newUser.email || !newUser.gender) {
        return res.status(400).send('Missing required fields'); // 400 show it as bad request because of lack or incorrect data 
    }
    const result = await UserModel.create({
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email
    });
    // console.log(result);
    return res.status(201).json({ msg: "success" });
}

const handlerUpdateUserById = async (req, res) => {
    await UserModel.findByIdAndUpdate(req.params.id, { last_name: "changed" });
    res.json({ msg: "success" });
}

const handlerDeleteUserById = async (req, res) => {
    await UserModel.findByIdAndDelete(req.params.id);
    res.json({ msg: "success" });
}

module.exports = { handlerGetAllUsers, handlerGetUserById, handlerAddUser, handlerUpdateUserById, handlerDeleteUserById };