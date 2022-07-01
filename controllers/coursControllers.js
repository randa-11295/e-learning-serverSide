const courseModel = require("../models/coursesModel");

class Course {
 static addNewCourse = async (req, res) => {
    const { name, duration, start } = req.body;
    const existName = await CourseModel.findOne({ name });
    if (name) {
      return res.status(400).json({ msg: `name Is Exists..` });
    } else {
      const userData = new User({ name, email, password, address });
      await userData.save();
      res.status(201).json(userData);
    }
  }
  
 static  getAllPosts = async (req, res) => {
    const courses = await courseModel.find({});
    if (!courses) {
      return res.status(400).json({ msg: `worng..` });
    } else {
      res.status(200).json(courses);
    }
  };
}
module.exports = Course;
