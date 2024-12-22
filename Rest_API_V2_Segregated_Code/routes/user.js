const express = require("express");
const { handlerGetAllUsers, handlerGetUserById, handlerAddUser, handlerUpdateUserById, handlerDeleteUserById } = require("../controllers/user");
const router = express.Router();

router.get("/", handlerGetAllUsers);

router.post('/', handlerAddUser);

router.route('/:id')
    .get(handlerGetUserById)
    .delete(handlerDeleteUserById)
    .patch(handlerUpdateUserById);

module.exports = router;
