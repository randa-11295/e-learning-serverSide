const express = require("express");
const CourseModel  = require("../models/coursesModel");
const { User } = require("../models/usersModel");
const Course = require("../controllers/coursControllers")
const router = express.Router();

// add
router.post("/courses/add", Course.addNewCourse);



router.get("/courses", Course.getAllPosts );


router.post("/cart", async (req, res) => {
  const { userId, courseId } = req.body;
  const user = await User.findById(userId);
  const cousrse = await CourseModel.findById(courseId);
  test = "";
  if (user && cousrse) {
    if (!user.cart.includes(courseId)) {
      test = "added";
      user.cart.push(courseId);
    } else {
      test = "removed";
      let index = user.cart.indexOf(courseId);
      user.cart.splice(index, 1);
    }

    await user.save();
    res.status(201).json({ msg: "done " + test, user });
  } else {
    res.status(404).json({ msg: "failed" });
  }
});


router.post("/cart/remove", async (req, res) => {
  const { userId, courseId } = req.body;
  const user = await User.findById(userId);
  try {
    if (user) {
      let index = user.cart.findIndex((id) => id == courseId);//0 , -1 true false
      if (index !== -1) {
        user.cart.splice(index, 1);
        await user.save();
        res.status(201).json({ msg: "done ", data: user });
      } else {
        throw new Error();
      }
    }
  } catch (error) {
    res.status(400).json({ msg: "failed" });
  }
});

router.post("/library", async (req, res) => {
  const { _id } = req.body;
  console.log(_id);
  const user = await User.findById(_id).populate({ path: "cart" }).exec();
  if (user) {
    res.status(200).json({ data: user.cart });
  } else {
    return res.status(400).json({ msg: `worng..` });
   
  }

  
});

module.exports = router;
