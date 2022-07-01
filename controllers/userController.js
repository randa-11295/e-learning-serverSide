const UserModel = require("../models/usersModel");
const generetToken = require("../utils/generetToken")

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
        res.status(200).json({ ...user , token : generetToken(user._id) });
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
        { new: true, }
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
}
module.exports = User;
