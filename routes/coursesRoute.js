const express = require("express");
const CourseModel  = require("../models/coursesModel");
const { User } = require("../models/usersModel");
const Course = require("../controllers/coursControllers")
const router = express.Router();

// add
router.post("/courses/add", Course.addNewCourse);



router.get("/courses", Course.getAllCourses );




module.exports = router;
