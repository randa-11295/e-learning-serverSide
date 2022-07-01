const express = require("express");
const UserModel = require("../models/usersModel");
const User = require("../controllers/userController");

const router = express.Router();

router.post("/register", User.register);

router.post("/login", User.login);

router.patch("/update/:id", User.updateUser);

module.exports = router;
