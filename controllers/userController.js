const UserModel = require("../models/usersModel");
const courseModel = require("../models/coursesModel");
const generetToken = require("../utils/generetToken");

class User {
  static login = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: `email   wrong..` });
    } else {
      if (password != user.password) {
        return res.status(401).json({ msg: `password wrong..` });
      } else {
        res.status(200).json({ ...user, token: generetToken(user._id) });
      }
    }
  };

  static register = async (req, res) => {
    const { name, email, address, password } = req.body;
    const existEmail = await UserModel.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ msg: `Email Is Exists..` });
    } else {
      const userData = new User({ name, email, password, address });
      await userData.save();
      res.status(201).json(userData);
    }
  };
  static updateUser = async (req, res) => {
    try {
      const update = await UserModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.json({
        status: "succsess",
        update,
      });
    } catch (error) {
      res.json({
        status: "Falid",
        error,
      });
    }
  };

  static getMyCourser = async (req, res) => {
    const { _id } = req.body;
    const user = await UserModel.findById(_id);
    const courses = await courseModel.find({});
    if (user) {
      const data = courses.filter((el) => user.cart.includes(el._id));
      res.status(200).json({ data, status: "succsess " });
    } else {
      return res.status(400).json({ msg: `worng..` });
    }
  };

  static findCourses = async (req, res) => {
    const { userId, courseId } = req.body;
    const user = await UserModel.findById(userId);
    const cousrse = await courseModel.findById(courseId);
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
  };

  static removeFromCart = async (req, res) => {
    const { userId, courseId } = req.body;
    const user = await UserModel.findById(userId);
    try {
      if (user) {
        let index = user.cart.findIndex((id) => id == courseId); //0 , -1 true false
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
  };
}
module.exports = User;
