const express = require("express");
const User = require("../controllers/userController");

const router = express.Router();

router.post("/register", User.register);

router.post("/login", User.login);

router.patch("/update/:id", User.updateUser);

router.post("/cart", User.findCourses);

router.post("/library", User.getMyCourser);

router.post("/cart/remove", User.removeFromCart);

module.exports = router;
